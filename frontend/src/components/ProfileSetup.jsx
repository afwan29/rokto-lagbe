import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const ProfileSetup = () => {
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    bloodGroup: "",
    address: "",
    lastDonated: "",
    available: true,
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        const docSnap = await getDoc(doc(db, "users", u.uid));
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      }
    });
    return () => unsub();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Not logged in!");
      return;
    }
    try {
      await setDoc(doc(db, "users", user.uid), profile);
      alert("Profile saved!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="container">
      <h2>Setup Profile</h2>
      <form onSubmit={handleSave}>
        <input name="name" value={profile.name} onChange={handleChange} placeholder="Name" required />
        <input name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" />
        
        {/* Change bloodGroup input to select */}
        <select
          name="bloodGroup"
          value={profile.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <input name="address" value={profile.address} onChange={handleChange} placeholder="Address" />
        <input type="date" name="lastDonated" value={profile.lastDonated} onChange={handleChange} />
        <label>
          Available:
          <input type="checkbox" name="available" checked={profile.available} onChange={handleChange} />
        </label>
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default ProfileSetup;
