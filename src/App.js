import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import EventDetails from './components/EventDetails';
import Profile from './components/Profile';
import Messaging from './components/Messaging';
import Suggestions from './components/Suggestions';
import ThemeToggle from './components/ThemeToggle'; // ✅ Import toggle

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        {/* ✅ Theme toggle aligned to top-right */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '10px',
            position: 'sticky',
            top: 0,
            background: 'var(--bg-color)',
            zIndex: 1000
          }}
        >
          <ThemeToggle />
        </div>

        {/* ✅ All route pages */}
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/suggestions" element={<Suggestions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
