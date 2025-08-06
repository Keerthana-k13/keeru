import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [attendedEvents, setAttendedEvents] = useState([]);
  const [certificate, setCertificate] = useState(null);

  // Using existing user ID from database (mce user)
  const userId = 5;

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/users/${userId}/`)
      .then(res => setUser(res.data))
      .catch(err => {
        console.error('Error fetching user:', err);
        alert('Failed to load user profile');
      });
    
    axios.get(`http://127.0.0.1:8000/api/events/?participant=${userId}`)
      .then(res => setAttendedEvents(res.data))
      .catch(err => {
        console.error('Error fetching attended events:', err);
        setAttendedEvents([]);
      });
  }, [userId]);

  const handleCertificateUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('user', userId);
    formData.append('event', attendedEvents[0]?.id || ''); // Example: first event
    formData.append('file', certificate);
    await axios.post('http://127.0.0.1:8000/api/users/certificates/upload/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    alert('Certificate uploaded!');
  };

  const handleCVDownload = () => {
    window.open(`http://127.0.0.1:8000/api/users/cv/${userId}/`, '_blank');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{maxWidth: 600, margin: '40px auto'}}>
      <h2>Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <h3>Attended Events</h3>
      <ul>
        {attendedEvents.map(ev => (
          <li key={ev.id}>{ev.title}</li>
        ))}
      </ul>
      <h3>Upload Certificate</h3>
      <form onSubmit={handleCertificateUpload}>
        <input type="file" onChange={e => setCertificate(e.target.files[0])} required />
        <button type="submit">Upload</button>
      </form>
      <h3>Generate CV</h3>
      <button onClick={handleCVDownload}>Download CV (PDF)</button>
    </div>
  );
}

export default Profile; 