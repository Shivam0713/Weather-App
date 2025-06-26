import React, { useState } from 'react';
import './Login.css';
import Signup from './Signup';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    // Check credentials against localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
      setError('Invalid username or password');
      return;
    }

    // Successful login
    localStorage.setItem('currentUser', username);
    localStorage.setItem('isLoggedIn', 'true');
    onLogin(user);
  };

  if (showSignup) {
    return <Signup onSignup={onLogin} onSwitchToLogin={() => setShowSignup(false)} />;
  }

  return (
    <div className="login-modal">
      <div className="login-content">
        <h2>Welcome to Weather App</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <div className="button-group">
            <button type="submit">Login</button>
            <button type="button" onClick={() => setShowSignup(true)}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;