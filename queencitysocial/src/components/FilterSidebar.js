// components/FilterSidebar.js
import React from 'react';
import './FilterSidebar.css';

function FilterSidebar() {
  return (
    <aside className="filter-sidebar">
      <h3>Filter By</h3>
      <div className="filter-group">
        <label>Category</label>
        <div className="checkbox-group">
          <label><input type="checkbox" /> Sports</label>
          <label><input type="checkbox" /> Food</label>
          <label><input type="checkbox" /> Art</label>
        </div>
      </div>
      <div className="filter-group">
        <label>Date</label>
        <div className="date-options">
          <label><input type="radio" name="date" /> Today</label>
          <label><input type="radio" name="date" /> Week</label>
          <div className="date-range">
            <label>From</label>
            <input type="date" />
            <label>To</label>
            <input type="date" />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default FilterSidebar;
