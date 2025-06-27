import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const q = query(collection(db, "users"), where("available", "==", true));
      const snaps = await getDocs(q);
      const arr = snaps.docs.map((d) => ({ id: d.id, ...d.data() }));
      console.log("Donors loaded:", arr);
      setDonors(arr);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="container">
      <h2>Available Donors</h2>
      {loading ? <p>Loading...</p> :
        donors.length === 0 ? <p>No donors available.</p> :
        <ul>
          {donors.map((d) => (
            <li key={d.id}>
              <b>{d.name || "Anonymous"}</b> — {d.bloodGroup} — {d.phone}
            </li>
          ))}
        </ul>
      }
    </div>
  );
};

export default DonorList;
