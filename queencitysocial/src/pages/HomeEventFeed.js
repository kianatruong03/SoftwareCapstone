// /src/pages/HomePage.js
import React from 'react';
import Header from '../components/Header';
import FilterSidebar from '../components/FilterSidebar';
import EventCard from '../components/EventCard';
import '../css/main.css';

function HomePage() {
  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <div className="col-md-3">
          <FilterSidebar /> {/* Updated to use FilterSidebar */}
        </div>
        <div className="col-md-9">
          <section className="event-card-section">
            <EventCard title="Dessert Festival" date="10/01 - 10/07" />
            <EventCard title="Cupcake Center" date="10/03 - 10/15" />
            <EventCard title="Bakery Festival" date="9/23 - 9/28" finished />
          </section>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
