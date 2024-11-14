// /src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FilterSidebar from '../components/FilterSidebar';
import EventCard from '../components/EventCard';
import '../css/main.css';

function HomePage() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await fetch(`/home?page=${page}&limit=10`, {
        cache: 'no-store'
      });
      const data = await response.json();

      if (data.length > 0) {
        setEvents((prevEvents) => [...prevEvents, ...data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false); // No more events to load
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };


  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);  // Add fetchEvents as a dependency

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore) {
      fetchEvents();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]); // Add handleScroll as a dependency

  return (
    <div className="container-fluid">
      <Header />
      <div className="row">
        <div className="col-md-3">
          <FilterSidebar />
        </div>
        <div className="col-md-9">
          <section className="event-card-section">
            {events.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                date={`${new Date(event.start).toLocaleString()} - ${new Date(event.end).toLocaleString()}`}
                finished={event.state === "deleted"}
                labels={event.labels} // Pass the labels array from API response
                description={event.description} // Pass the description from API response
              />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
