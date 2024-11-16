// /src/components/Header.js
import React from 'react';
import '../css/Header.css';
import Logo from '../Photos/CapstoneLogo.png';

function Header({ onSearchChange }) {
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <header className="header d-flex align-items-center p-3">
      <div className="me-auto">
      <img 
        src={Logo} 
        alt="QueenCitySocial Logo" 
        className="img-fluid" 
        style={{ maxWidth: '70%' }}
        />
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
      <a class="nav-link" href="/login">Login/Signup</a>
      </div>
    </header>
  );
}

export default Header;
