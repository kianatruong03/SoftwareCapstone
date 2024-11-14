import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomeEventFeed from './pages/HomeEventFeed'
import SpotlightEvent from './pages/SpotlightEvent'
import AccountManagement from './pages/AccountManagement'
import EventPage from './pages/EventPage'
import Login from './pages/Login'
import Signup from './pages/Signup';

const App = () => {
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

    </div>
  );
};

export default App;