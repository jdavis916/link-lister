// src/pages/Login.jsx
import { useState } from 'react';
import { account } from '../lib/appwrite';  // Import the account from appwrite.js

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await account.createSession(email, password);  // Create a session for the admin
      window.location.href = "/dashboard";  // Redirect to dashboard after login
    } catch (error) {
      setError('Login failed. Please check your credentials. : ', error);
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
