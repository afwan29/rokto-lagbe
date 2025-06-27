import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import MapComponent from './MapComponent';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const BloodRequest = () => {
  const [group, setGroup] = useState('');
  const [location, setLocation] = useState('');
  const [reason, setReason] = useState('');
  const [coords, setCoords] = useState(null);
  const locationInputRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.onload = initAutocomplete;
        document.body.appendChild(script);
      } else {
        initAutocomplete();
      }
    };

    const initAutocomplete = () => {
      if (locationInputRef.current && window.google) {
        const autocomplete = new window.google.maps.places.Autocomplete(locationInputRef.current);
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.geometry && place.geometry.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            setCoords([lat, lng]);
            setLocation(place.formatted_address || '');
          }
        });
      }
    };

    loadGoogleMapsScript();
  }, []);

  const handleSetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCoords([lat, lng]);
        setLocation(`Lat: ${lat.toFixed(5)}, Lng: ${lng.toFixed(5)}`);
      },
      () => alert('Unable to retrieve your location')
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;
    if (!coords) {
      alert('Please set your location first');
      return;
    }

    try {
      await addDoc(collection(db, 'requests'), {
        uid: user.uid,
        bloodGroup: group,
        location,
        reason,
        coords,
        createdAt: new Date()
      });
      alert('Request created!');
      setGroup('');
      setLocation('');
      setReason('');
      setCoords(null);
    } catch (err) {
      alert('Failed: ' + err.message);
    }
  };

  return (
    <div className="container">
      <h2>Request Blood</h2>
      <form onSubmit={handleSubmit}>
        <select value={group} onChange={(e) => setGroup(e.target.value)} required>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <input
          ref={locationInputRef}
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (Search or Set below)"
          required
        />
        <button type="button" onClick={handleSetCurrentLocation}>
          Use Current Location
        </button>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Write down Patient's Problem Summery"
        />
        <button type="submit">Submit Request</button>
      </form>

      {coords && (
        <div className="map-container" style={{ height: '300px', marginTop: '20px' }}>
          <MapComponent center={coords} zoom={13} />
        </div>
      )}
    </div>
  );
};

export default BloodRequest;
