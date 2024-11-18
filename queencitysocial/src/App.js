import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomeEventFeed from './pages/HomeEventFeed';
import SpotlightEvent from './pages/SpotlightEvent';
import AccountManagement from './pages/AccountManagement';
import EventPage from './pages/EventPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('authToken') // Check token in localStorage to persist authentication
  );

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Set authenticated to true upon successful login
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token on logout
    setIsAuthenticated(false); // Set authenticated to false
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public routes for Login and Signup */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/account" replace />
              ) : (
                <Login key="login" onLoginSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to="/account" replace />
              ) : (
                <Signup key="signup" />
              )
            }
          />

          {/* Private routes: accessible only if authenticated */}
          <Route
            path="/home"
            element={isAuthenticated ? <HomeEventFeed /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/spotlight"
            element={isAuthenticated ? <SpotlightEvent /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/event"
            element={isAuthenticated ? <EventPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/account"
            element={isAuthenticated ? <AccountManagement onLogout={handleLogout} /> : <Navigate to="/login" replace />}
          />

          {/* Default route */}
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? '/account' : '/login'} replace />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
