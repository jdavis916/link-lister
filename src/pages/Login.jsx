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
    } catch (err) {
      console.error(err);
      setError(`Login failed. Please check your credentials. (${err.message})`);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold text-center mb-6">Dat Boy Will&apos;s - Mastermind</h1>
        <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
          {error && (
            <p className="text-red-600 text-center mt-2">{error}</p>
          )}
        </form>
      </section>
    </main>
  );
};

export default Login;
