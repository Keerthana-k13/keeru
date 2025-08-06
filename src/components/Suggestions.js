import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [newSuggestion, setNewSuggestion] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/events/suggestions/')
      .then(res => setSuggestions(res.data));
  }, []);

  const handleSuggestionSubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://127.0.0.1:8000/api/events/suggestions/', {
      event: 1,
      user: 1,
      suggestion: newSuggestion
    });

    setNewSuggestion('');
    const res = await axios.get('http://127.0.0.1:8000/api/events/suggestions/');
    setSuggestions(res.data);
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.heading}>💡 Suggestions</h2>

      <ul style={styles.list}>
        {suggestions.map((s) => (
          <li key={s.id} style={styles.card}>
            {s.suggestion}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSuggestionSubmit} style={styles.form}>
        <input
          value={newSuggestion}
          onChange={(e) => setNewSuggestion(e.target.value)}
          placeholder="Add a suggestion..."
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '16px',
    backgroundColor: 'var(--bg)',
    boxShadow: '0 10px 24px rgba(0,0,0,0.08)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    fontSize: '1.6rem',
    color: 'var(--primary)',
    marginBottom: '20px',
    textAlign: 'center',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginBottom: '24px',
  },
  card: {
    background: 'var(--card)',
    padding: '12px 16px',
    borderRadius: '10px',
    marginBottom: '12px',
    border: '1px solid #e0e0e0',
    color: 'var(--text)',
    fontSize: '1em',
  },
  form: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px 12px',
    fontSize: '1em',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#f5f7fa',
  },
  button: {
    backgroundColor: 'var(--primary)',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default Suggestions;
