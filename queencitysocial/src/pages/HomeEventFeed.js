import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import FilterSidebar from '../components/FilterSidebar';
import EventCard from '../components/EventCard';
import Logo from '../Photos/CapstoneLogo.png';
import '../css/main.css';

function HomeEventFeed() {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    location: '',
    distance: 10
  });

// HomeEventFeed.js
const fetchEvents = useCallback(async () => {
  try {
    const queryParams = new URLSearchParams({
      page,
      limit: 10,
      q: searchQuery, // Pass the search query
      categories: filters.categories.join(','), // Pass selected categories as a comma-separated string
      location: filters.location,
      distance: filters.distance
    });

    const response = await fetch(`/home?${queryParams.toString()}`, {
      cache: 'no-store'
    });
    const data = await response.json();

    if (data.length > 0) {
      setEvents((prevEvents) => [...prevEvents, ...data]);
      setPage((prevPage) => prevPage + 1);
    } else {
      setHasMore(false);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}, [page, searchQuery, filters]);


  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset page for new filters
    setEvents([]); // Clear events to load new data
    fetchEvents();
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setPage(1); // Reset page for new search
    setEvents([]); // Clear events to load new data
    fetchEvents();
  };

  return (
    <div className="container-fluid">
      <Header onSearchChange={handleSearchChange} />
      <div className="row">
        <div className="col-md-3">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>
        <div className="col-md-9">
          <section className="event-card-section">
            {events.map((event) => {
              const start = new Date(event.start);
              const end = new Date(event.end);

              // Format date to display as "Month Day, Year" (e.g., "Nov 14, 2024")
              const formattedDate = start.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });

              // Check if the event is an "ALL DAY" event
              const isAllDay = start.getHours() === 0 && start.getMinutes() === 0 && end.getHours() === 23 && end.getMinutes() === 59;

              // Format the time part
              const timeString = isAllDay
                ? "ALL DAY"
                : `${start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

              return (
                <EventCard
                  key={event.id}
                  title={event.title}
                  date={`${formattedDate} ${timeString}`} // Include both date and time/ALL DAY
                  finished={event.state === "deleted"}
                  category={event.category}
                  labels={event.labels}
                  description={event.description}
                />
              );
            })}

          </section>
        </div>
      </div>
    </div>
  );
}

export default HomeEventFeed;
