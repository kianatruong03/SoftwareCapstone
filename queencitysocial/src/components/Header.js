// /src/components/Header.js
import React from 'react';
import '../css/Header.css';

function Header({ onSearchChange }) {
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <header className="header d-flex align-items-center p-3">
      <div className="me-auto">
        <h1 className="fs-4">LOGO/WEBSITE NAME</h1>
      </div>
      <div className="mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          onChange={handleInputChange} // Call handleInputChange on input change
        />
      </div>
      <div className="ms-auto">
        <i className="bi bi-person-circle fs-3"></i>
      </div>
    </header>
  );
}

export default Header;
