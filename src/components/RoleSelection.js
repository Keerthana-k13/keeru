import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RoleSelection.css';

function RoleSelection() {
  const navigate = useNavigate();
  return (
    <div className="role-selection-container">
      <h1>Welcome to Event Network!</h1>
      <p>Please select your role to continue:</p>
      <div className="role-selection-buttons">
        <button
          className="role-button"
          onClick={() => navigate('/login?role=organizer')}
        >
          Organizer
        </button>
        <button
          className="role-button"
          onClick={() => navigate('/login?role=participant')}
        >
          Participant
        </button>
      </div>
    </div>
  );
}

export default RoleSelection;
