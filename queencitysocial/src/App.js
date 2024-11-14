import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomeEventFeed from './pages/HomeEventFeed'
import SpotlightEvent from './pages/SpotlightEvent'
import AccountManagement from './pages/AccountManagement'
import EventPage from './pages/EventPage'
import Login from './pages/Login'
import Signup from './pages/Signup';

const App = () => { // below is what jenna had in her app.js
  return (
    <div className="App">
      <BrowserRouter>
        <Routes> 
          <Route index element = {<HomeEventFeed />}/>
          <Route path = "/home" element = {<HomeEventFeed />}/>
          <Route path = "/spotlight" element = {<SpotlightEvent />}/>
          <Route path = "/event" element = {<EventPage />}/> {/* Edit event pathing as it will be decided via api call to db, event#{event_id} type? */}
          <Route path = "/login" element = {<Login />}/>
          <Route path = "/signup" element = {<Signup />}/>
          <Route path = "/account" element = {<AccountManagement />}/>
          
        </Routes>
    </BrowserRouter>

const App = () => { // below is what kiana had in app.js
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track if the user is logged in
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Set authenticated to true upon successful login
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        // Render AccountManagement component when logged in
        <AccountManagement />
      ) : (
        // Show Login or Signup based on `isLogin`
        isLogin ? (
          <Login setIsLogin={setIsLogin} onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Signup setIsLogin={setIsLogin} />
        )
      )}
    </div>
  );
};

export default App;