// /src/components/EventCard.js
import React from 'react';
import '../css/EventCard.css';

function EventCard({ title, date, finished, category, labels = [], description }) {
  return (
    <div className="event-card">
      <div className="event-image-container">
        <img src="https://via.placeholder.com/80" alt="Event" className="event-image" />
      </div>
      <div className="event-details">
        <h5 className="card-title">
          {title} {finished && <span className="badge bg-danger">Finished</span>}
        </h5>
        
        {/* Displaying Category */}
        {category && (
          <p className="card-text">
            <span className="badge event-label me-1">{category}</span>
          </p>
        )}
        
        {/* Displaying Labels */}
        <p className="card-text">
          {labels.map((label, index) => (
            <span key={index} className="badge event-label me-1">{label}</span>
          ))}
        </p>
        
        {/* Displaying Description */}
        <p className="card-text">{description}</p>
      </div>
      <div className="event-actions">
        <span className="text-muted">{date}</span>
        <button className="btn btn-outline-primary btn-sm mt-2">View Details</button>
      </div>
    </div>
  );
}

export default EventCard;

