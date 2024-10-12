import React from 'react';
import './AccountManagement.css'; // Assuming you'll style it in an external CSS file

function AccountManagement() {
  return (
    <div className="account-management">
      {/* Header */}
      <div className="header">
        <div className="logo">LOGO/WEBSITE NAME</div>
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>

      {/* Profile Information Section */}
      <div className="profile-section">
        <h2>Profile Information</h2>
        <div className="profile-info">
          <div className="profile-avatar">
            <img src="profile-icon.png" alt="Profile Avatar" />
          </div>
          <form className="profile-form">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="New Password" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="State" />
            <input type="text" placeholder="Zip Code" />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>

      {/* Calendar and Events Section */}
      <div className="events-section">
        <div className="calendar">
          <h3>September 2024</h3>
          {/* Simple Calendar Mockup */}
          <table>
            <tbody>
              {/* Generate calendar rows here */}
              <tr><td>Su</td><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td></tr>
              {/* Map calendar data into rows */}
              {/* You can use libraries like `react-calendar` for a full calendar */}
            </tbody>
          </table>
        </div>

        <div className="upcoming-events">
          <h3>Upcoming Events</h3>
          <ul>
            <li>Dessert Festival</li>
            <li>Cupcake Center</li>
            <li>Dessert Festival</li>
          </ul>
        </div>

        <div className="previous-events">
          <h3>Previous Events Attended</h3>
          <ul>
            <li>Bakery Festival</li>
            <li>Bakery Festival</li>
            <li>Bakery Festival</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AccountManagement;
