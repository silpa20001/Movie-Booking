import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styling/login.css'; // Import the Login CSS

function Login({ onLogin, closeModal, onRegisterClick }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showRegisterPage , setShowRegisterPage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/user');
      if (response.ok) {
        const users = await response.json();
        const user = users.find(
          (u) => u.username === username && u.password === password
        );


        if (user) {
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('role', user.role);
          toast.success(`Logged in as ${user.role}`);
          onLogin(user);
        } else {
          toast.error('Login failed: Invalid credentials');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-modal">

      <div className="login-content">
        <form onSubmit={handleLogin}>
          <div className="login-header">
            <span className="close-btn" onClick={closeModal}> &#10006; </span>
          </div>
          <h1>Login</h1>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button className="btn btn-primary">Login</button>
        </form>
        <div className="mb-3">
            Don't have an account? <button  onClick={onRegisterClick }>Register here</button>
          </div>
      </div>
    </div>
  );
}

export default Login;
