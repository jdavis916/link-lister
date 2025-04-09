// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { client } from '../lib/appwrite';  // Import the existing client from appwrite.js
import { Databases } from 'appwrite';      // Import Databases service from Appwrite

const databases = new Databases(client);   // Use the existing client to initialize the Databases service

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_COLLECTION_ID, // Collection ID
        import.meta.env.VITE_APPWRITE_DATABASE_ID // Database ID
      );
      setUsers(response.documents);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
      <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
        Dat Boy Will&apos;s
      </h1>
      <h2 className="text-2xl font-semibold text-center mb-10 text-gray-600">
        Mastermind
      </h2>

        
        {users.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {users
              .slice() // optional: avoids mutating original state
              .sort((a, b) => a.name.localeCompare(b.name)) // sort alphabetically by name
              .map((user) => (
              <div key={user.$id} className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
                <p className="text-gray-600 mb-4">{user.email}</p>

                {/* Display links only if they exist */}
                <div className="space-y-2">
                  {user.youtube && (
                    <a href={user.youtube} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline block">
                      YouTube
                    </a>
                  )}
                  {user.x && (
                    <a href={user.x} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline block">
                      Twitter (X)
                    </a>
                  )}
                  {user.twitch && (
                    <a href={user.twitch} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline block">
                      Twitch
                    </a>
                  )}
                  {user.tiktok && (
                    <a href={user.tiktok} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline block">
                      TikTok
                    </a>
                  )}
                  {user.instagram && (
                    <a href={user.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline block">
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No users found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
