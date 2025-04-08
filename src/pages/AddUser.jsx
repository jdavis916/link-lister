// src/pages/AddUser.jsx
import { useState } from 'react';
import { client } from '../lib/appwrite';  // Import the existing client from appwrite.js
import { Databases, ID } from 'appwrite';  // Import Databases and ID from Appwrite

const databases = new Databases(client);  // Initialize the Databases service using the client

const AddUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    channel: '',
    email: '',
    youtube: '',
    x: '',
    twitch: '',
    tiktok: '',
    instagram: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add new user to the "Users" collection
      await databases.createDocument(
        '6718cbed0034eb877fc0', // Collection ID
        '6718cc030007b5b40502', // Database ID
        ID.unique(), 
        formData);
      window.location.href = "/dashboard";  // Redirect to dashboard after adding user
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Add New User</h2>
  
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Channel</label>
            <input
              name="channel"
              value={formData.channel}
              onChange={handleChange}
              placeholder="Channel Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
  
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label className="block text-gray-700 font-semibold mb-2">YouTube</label>
            <input
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              placeholder="YouTube Link"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Twitter (X)</label>
            <input
              name="x"
              value={formData.x}
              onChange={handleChange}
              placeholder="Twitter (X) Link"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Twitch</label>
            <input
              name="twitch"
              value={formData.twitch}
              onChange={handleChange}
              placeholder="Twitch Link"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label className="block text-gray-700 font-semibold mb-2">TikTok</label>
            <input
              name="tiktok"
              value={formData.tiktok}
              onChange={handleChange}
              placeholder="TikTok Link"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Instagram</label>
            <input
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="Instagram Link"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
  
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default AddUser;
