// components/EventList.js
import React from 'react';
import './EventList.css';

function EventList() {
  const events = [
    { id: 1, title: 'Dessert Festival', category: ['Food', 'Social', 'Weekly'], date: '10/01 - 10/07', description: 'Experience delightful desserts from around the world.', status: 'Upcoming', image: 'https://via.placeholder.com/100' },
    { id: 2, title: 'Cupcake Center', category: ['Food', 'Social'], date: '10/03 - 10/15', description: 'Discover amazing cupcake varieties and recipes.', status: 'Upcoming', image: 'https://via.placeholder.com/100' },
    { id: 3, title: 'Bakery Festival', category: ['Food', 'Social'], date: '9/23 - 9/28', description: 'Celebrate all things baked at this community event.', status: 'Finished', image: 'https://via.placeholder.com/100' }
  ];

  return (
    <section className="event-list">
      {events.map((event) => (
        <div className="event-card" key={event.id}>
          <img src={event.image} alt={event.title} className="event-image" />
          <div className="event-info">
            <h3>{event.title} {event.status === 'Finished' && <span className="status finished">Finished</span>}</h3>
            <div className="event-tags">
              {event.category.map((cat, index) => <span key={index} className="tag">{cat}</span>)}
            </div>
            <p className="event-date">{event.date}</p>
            <p className="event-description">{event.description}</p>
            <button className="details-button">View Details</button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default EventList;
