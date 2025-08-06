// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const role = new URLSearchParams(location.search).get('role');

  const handleLogin = async (e) => {
    e.preventDefault();
    // TODO: Replace this with actual login logic
    navigate('/home');
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Login {role && `as ${role}`}</h2>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>

      <p className="auth-text">
        Don't have an account?{' '}
        <span className="auth-link" onClick={() => navigate('/register')}>
          Register
        </span>
      </p>
    </form>
  );
}

export default Login;
