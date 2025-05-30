// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { account } from '../lib/appwrite';  // Import the account object from appwrite.js
import { client } from '../lib/appwrite';   // Import the existing client from appwrite.js
import { Databases } from 'appwrite';       // Import Databases from Appwrite

const databases = new Databases(client);    // Initialize the Databases service

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState(null); // Added fetchError state

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const dbId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
    const collectionId = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

    console.log(`Dashboard: VITE_APPWRITE_DATABASE_ID = ${dbId}`);
    console.log(`Dashboard: VITE_APPWRITE_COLLECTION_ID = ${collectionId}`);

    if (!dbId) {
      console.warn('Warning: VITE_APPWRITE_DATABASE_ID is not set in your environment. User data fetching will likely fail.');
    }
    if (!collectionId) {
      console.warn('Warning: VITE_APPWRITE_COLLECTION_ID is not set in your environment. User data fetching will likely fail.');
    }

    try {
      const response = await databases.listDocuments(
        collectionId,  // Use the variable here
        dbId           // Use the variable here
      );  // Fetch all user documents
      setUsers(response.documents);  // Set users in state
    } catch (error) {
      console.error('Error fetching users:', error); // Kept existing console error
      setFetchError('Failed to fetch users. Please check console for details or contact support.'); // Set fetchError state
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');  // Log out the admin
      window.location.href = "/login";  // Redirect to login after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 mb-6"
        >
          Logout
        </button>

        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Users List</h3>

        {/* Conditional rendering for fetchError */}
        {fetchError && <p className="text-red-600 text-center mb-4">{fetchError}</p>}

        {/* Display users in a column */}
        <div className="space-y-4">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.$id}
                className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h4 className="text-xl font-semibold text-gray-800">{user.name}</h4>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <div className="space-x-4">
                  <a
                    href={`/edit-user/${user.$id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </a>
                  <a
                    href={`/delete-user/${user.$id}`}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No users found.</p>
          )}
        </div>

        <div className="mt-6">
          <a
            href="/add-user"
            className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Add New User
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
