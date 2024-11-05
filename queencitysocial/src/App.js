import React from 'react';
import Header from '/components/Header';
import FilterSidebar from './components/FilterSidebar';
import EventList from './components/EventList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <FilterSidebar />
        <EventList />
      </div>
    </div>
  );
}

export default App;

