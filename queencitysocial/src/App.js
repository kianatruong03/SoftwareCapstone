import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomeEventFeed from './pages/HomeEventFeed'
import SpotlightEvent from './pages/SpotlightEvent'
import AccountManagement from './pages/AccountManagement'
import EventPage from './pages/EventPage'
import LoginSignUp from './pages/LoginSignUp'

function App() {
  return ( // Routing to different website endpoints
    <div>
      <BrowserRouter>
        <Routes> 
          <Route index element = {<HomeEventFeed />}/>
          <Route path = "/home" element = {<HomeEventFeed />}/>
          <Route path = "/spotlight" element = {<SpotlightEvent />}/>
          <Route path = "/event" element = {<EventPage />}/> {/* Edit event pathing as it will be decided via api call to db, event#{event_id} type? */}
          <Route path = "/login" element = {<LoginSignUp />}/>
          <Route path = "/account" element = {<AccountManagement />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;