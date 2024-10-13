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
        {/* Change code once implementing the active month and year function so it changes based on time */}
        <h3>October 2024</h3>
        {/* Simple Calendar Mockup */}
            <table>
                <iframe 
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&bgcolor=%23B39DDB&src=a2lhbmF0cnVvbmcwM0BnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043"
                style={{ border: 'solid 1px #777' }} 
                width="550" 
                height="400" 
                frameBorder="0" 
                scrolling="no">
                </iframe>
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
