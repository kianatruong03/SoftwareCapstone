import React, { useState } from 'react';
import '../css/FilterSidebar.css';

function FilterSidebar() {
  const [distance, setDistance] = useState(10); // Default distance value
  const [location, setLocation] = useState('');

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  return (
    <aside className="filter-sidebar p-3 bg-white border-end">
      <h3 className="fs-5">Filter By</h3>

      <div className="mb-3">
        <h4 className="fs-6">Category</h4>
        {['Music', 'Arts', 'Sports', 'Food & Drink', 'Networking', 'Family/Kids', 'Education', 'Outdoor', 'Fitness/Wellness'].map((category, index) => (
          <div className="form-check" key={index}>
            <input
              type="checkbox"
              className="form-check-input"
              id={category.toLowerCase().replace(/ /g, '-')}/>
            <label className="form-check-label" htmlFor={category.toLowerCase().replace(/ /g, '-')}>
              {category}
            </label>
          </div>
        ))}
      </div>

      <div className="filter-sidebar-content">
        <div className="location-filter mb-3">
          <label htmlFor="location">Location:</label>
          <input
            id="location"
            type="text"
            className="location-input form-control"
            value={location}
            onChange={handleLocationChange}
            placeholder="Enter a location"
          />
        </div>

        <div className="distance-filter mb-3">
          <label htmlFor="distance">Distance (miles):</label>
          <input
            id="distance"
            type="range"
            min="0"
            max="100"
            step="1"
            value={distance}
            className="distance-slider form-range"
            onChange={handleDistanceChange}
          />
          <span>{distance} miles</span>
        </div>
      </div>

      <div className="mb-3">
        <h4 className="fs-6">Date</h4>
        {['Today', 'This Week'].map((timeframe, index) => (
          <div className="form-check" key={index}>
            <input type="radio" className="form-check-input" id={timeframe.toLowerCase()} name="date" />
            <label className="form-check-label" htmlFor={timeframe.toLowerCase()}>{timeframe}</label>
          </div>
        ))}
        <label className="form-label mt-2">From</label>
        <input type="date" className="form-control" />
        <label className="form-label mt-2">To</label>
        <input type="date" className="form-control" />
      </div>
    </aside>
  );
}

export default FilterSidebar;
