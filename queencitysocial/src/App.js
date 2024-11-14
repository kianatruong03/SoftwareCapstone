import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomeEventFeed from './pages/HomeEventFeed';
import SpotlightEvent from './pages/SpotlightEvent';
import AccountManagement from './pages/AccountManagement';
import EventPage from './pages/EventPage';
import Login from './pages/login';
import Signup from './pages/signup';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if the user is logged in
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Set authenticated to true upon successful login
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
                <Navigate to="/home" replace />
              ) : (
                isLogin ? (
                  <Login setIsLogin={setIsLogin} onLoginSuccess={handleLoginSuccess} />
                ) : (
                  <Navigate to="/signup" replace />
                )
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to="/home" replace />
              ) : (
                isLogin ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Signup setIsLogin={setIsLogin} />
                )
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
            element={isAuthenticated ? <AccountManagement /> : <Navigate to="/login" replace />} 
          />

          {/* Default route */}
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} 
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
