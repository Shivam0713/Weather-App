import React, { useState } from 'react';
import './Signup.css';

const Signup = ({ onSignup, onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.username === username || user.email === email);
    if (existingUser) {
      setError('Username or email already exists');
      return;
    }

    // Save user to localStorage
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Auto-login after signup
    localStorage.setItem('currentUser', username);
    localStorage.setItem('isLoggedIn', 'true');
    onSignup(newUser);
  };

  return (
    <div className="signup-modal">
      <div className="signup-content">
        <h2>Sign Up for Weather App</h2>
        <form onSubmit={handleSubmit}>
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit">Sign Up</button>
            <button type="button" onClick={onSwitchToLogin}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;