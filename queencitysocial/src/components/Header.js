// components/Header.js
import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">LOGO/WEBSITE NAME</div>
      <input type="text" placeholder="Search" className="search-bar" />
      <div className="profile-icon">👤</div>
    </header>
  );
}

export default Header;
