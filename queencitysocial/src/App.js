import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AccountManagement from './AccountManagement';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect the root path "/" to "/account" */}
        <Route path="/" element={<Navigate to="/account" replace />} />
        
        {/* The Account Management page */}
        <Route path="/account" element={<AccountManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
