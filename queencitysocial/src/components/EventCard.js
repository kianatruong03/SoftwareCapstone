// /src/components/EventCard.js
import React from 'react';
import '../css/EventCard.css';

function EventCard({ title, date, finished }) {
  return (
    <div className="event-card">
      <div className="event-image-container">
        <img src="https://via.placeholder.com/80" alt="Event" className="event-image" />
      </div>
      <div className="event-details">
        <h5 className="card-title">
          {title} {finished && <span className="badge bg-danger">Finished</span>}
        </h5>
        <p className="card-text">
          <span className="badge event-label me-1">Food</span>
          <span className="badge event-label me-1">Social</span>
          {finished ? (
            <span className="badge bg-secondary">Finished Event</span>
          ) : (
            <span className="badge bg-info">Weekly</span>
          )}
        </p>
        <p className="card-text">Lorem ipsum dolor sit amet...</p>
      </div>
      <div className="event-actions">
        <span className="text-muted">{date}</span>
        <button className="btn btn-outline-primary btn-sm mt-2">View Details</button>
      </div>
    </div>
  );
}

export default EventCard;
