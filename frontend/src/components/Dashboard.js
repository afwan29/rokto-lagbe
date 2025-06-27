import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      alert('Logout failed: ' + err.message);
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <button style={styles.navButton} onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button style={styles.navButton} onClick={() => navigate('/profile')}>Profile</button>
        <button style={styles.navButton} onClick={() => navigate('/request')}>Request Blood</button>
        <button style={styles.navButton} onClick={() => navigate('/donors')}>Find Donors</button>
        <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </nav>
      <div style={styles.content}>
        <h1>Welcome to the Dashboard</h1>
        <p>This is your dashboard after logging in.</p>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', background: '#f5f5f5' },
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    padding: '15px',
    background: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  navButton: {
    padding: '8px 16px',
    background: '#d32f2f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  logoutButton: {
    padding: '8px 16px',
    background: '#555',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  content: {
    textAlign: 'center',
    padding: '40px',
  },
};

export default Dashboard;
