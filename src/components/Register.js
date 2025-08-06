// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // 🔧 Replace with actual API call later
    alert(`Registered as ${username}`);
    navigate('/login');
  };

  return (
    <form className="register-form" onSubmit={handleRegister}>
      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Register</button>

      <p className="auth-text">
        Already have an account?{' '}
        <span className="auth-link" onClick={() => navigate('/login')}>
          Login
        </span>
      </p>
    </form>
  );
}

export default Register;
