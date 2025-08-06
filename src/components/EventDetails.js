import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './EventDetails.css';

function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [newSuggestion, setNewSuggestion] = useState('');
  const [summary, setSummary] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    // Fetch event data
    axios.get(`http://127.0.0.1:8000/api/events/${id}/`)
      .then(res => setEvent(res.data));

    // Fetch suggestions
    axios.get(`http://127.0.0.1:8000/api/events/suggestions/?event=${id}`)
      .then(res => setSuggestions(res.data));

    // Check registration status for user with ID 5
    axios.get(`http://127.0.0.1:8000/api/events/registrations/?event=${id}`)
      .then(res => {
        const isUserRegistered = res.data.some(reg => reg.participant === 5);
        setIsRegistered(isUserRegistered);
      })
      .catch(err => console.log('Error fetching registrations', err));
  }, [id]);

  const handleRegister = async () => {
    if (event && event.google_form_url) {
      try {
        // Save registration
        await axios.post('http://127.0.0.1:8000/api/events/register/', {
          event: event.id,
          participant: 5 // Replace with dynamic user ID
        });

        // Open Google Form
        window.open(event.google_form_url, '_blank');
        setIsRegistered(true);
        alert('Registered! Google Form opened.');
      } catch (error) {
        console.error('Error during registration:', error);
        alert('Registration failed: ' + (error.response?.data?.detail || error.message));
      }
    } else {
      alert('No registration form available for this event.');
    }
  };

  const handleSuggestionSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://127.0.0.1:8000/api/events/suggestions/', {
      event: id,
      user: 1, // Replace with logged-in user ID
      suggestion: newSuggestion
    });
    setNewSuggestion('');
    const res = await axios.get(`http://127.0.0.1:8000/api/events/suggestions/?event=${id}`);
    setSuggestions(res.data);
  };

  const fetchSummary = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/events/${id}/summary/`);
      setSummary(res.data.summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
      alert('Could not generate summary.');
    }
  };

  if (!event) return <div className="event-container">Loading...</div>;

  return (
    <div className="event-container">
      <h2 className="event-title">{event.title}</h2>
      <p className="event-meta"><strong>Category:</strong> {event.category}</p>
      <p className="event-meta"><strong>Date:</strong> {event.date}</p>
      <p>{event.description}</p>

      {isRegistered ? (
        <div className="registered-banner">
          ✅ You are registered for this event!
        </div>
      ) : (
        <button onClick={handleRegister}>Register (Google Form)</button>
      )}

      <hr />
      <h3>Suggestions</h3>
      <ul className="suggestion-list">
        {suggestions.map(s => (
          <li key={s.id}>{s.suggestion}</li>
        ))}
      </ul>

      <form onSubmit={handleSuggestionSubmit} className="suggestion-form">
        <input
          value={newSuggestion}
          onChange={e => setNewSuggestion(e.target.value)}
          placeholder="Add a suggestion..."
          required
        />
        <button type="submit">Submit</button>
      </form>

      <hr />
      <h3>AI Event Summary</h3>
      <button onClick={fetchSummary}>Get AI Summary</button>
      {summary && <p className="summary-box">{summary}</p>}
    </div>
  );
}

export default EventDetails;
