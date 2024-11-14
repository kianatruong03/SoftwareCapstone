import React, { useState } from 'react';
import '../css/FilterSidebar.css';

function FilterSidebar({ onFilterChange }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [distance, setDistance] = useState(10);

  const categories = [
    "academic", "airport-delays", "community", "concerts", "conferences", 
    "daylight-savings", "disasters", "expos", "festivals", "health-warnings", 
    "observances", "performing-arts", "politics", "public-holidays", 
    "school-holidays", "severe-weather", "sports", "terror"
  ];

  const handleCategoryChange = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    onFilterChange({ categories: newCategories, distance });
  };

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
    onFilterChange({ categories: selectedCategories, distance: e.target.value });
  };

  return (
    <aside className="filter-sidebar p-3 bg-white border-end">
      <h3 className="fs-5">Filter By</h3>

      <div className="mb-3">
        <h4 className="fs-6">Category</h4>
        {categories.map((category, index) => (
          <div className="form-check" key={index}>
            <input
              type="checkbox"
              className="form-check-input"
              id={category}
              onChange={() => handleCategoryChange(category)}
              checked={selectedCategories.includes(category)}
            />
            <label className="form-check-label" htmlFor={category}>
              {category.replace(/-/g, ' ')}
            </label>
          </div>
        ))}
      </div>

      <div className="filter-sidebar-content">
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
    </aside>
  );
}

export default FilterSidebar;
