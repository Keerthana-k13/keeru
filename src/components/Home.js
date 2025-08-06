// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/events/')
      .then(res => setEvents(res.data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  const filteredEvents = category === 'all' ? events : events.filter(e => e.category === category);

  return (
    <div className="home-container">
      <nav className="nav-bar">
        <button onClick={() => setCategory('all')}>All</button>
        <button onClick={() => setCategory('technical')}>Technical</button>
        <button onClick={() => setCategory('non-technical')}>Non-Technical</button>
        <button onClick={() => navigate('/profile')}>Profile</button>
        <button onClick={() => navigate('/messaging')}>Messaging</button>
        <button onClick={() => navigate('/suggestions')}>Suggestions</button>
      </nav>

      <h2 className="section-heading">Events</h2>

      <ul className="event-list">
        {filteredEvents.map(event => (
          <li key={event.id} className="event-item">
            <strong>{event.title}</strong> ({event.category})<br />
            <button onClick={() => navigate(`/event/${event.id}`)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
