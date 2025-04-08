//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Use Routes instead of Switch
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';

function App() {
  return (
    <Router>
      <Routes>
        {/* The default route */}
        <Route path="/" element={<Home />} />  {/* Use element instead of component */}
        
        {/* Other routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:userId" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
