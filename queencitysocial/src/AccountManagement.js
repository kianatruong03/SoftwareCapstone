import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profileIcon from './Photos/Profile-icon.png';
import './AccountManagement.css';



function AccountManagement() {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    state: '',
    zipCode: '',
  });
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [previousEvents, setPreviousEvents] = useState([]);
  const [googleCalendarEvents, setGoogleCalendarEvents] = useState([]);

  // Fetch Profile Information
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    
    fetchProfile();
  }, []);

  // Fetch Google Calendar Events
  useEffect(() => {
    const fetchCalendarEvents = async () => {
      try {
        const response = await axios.get('/api/calendar');
        setGoogleCalendarEvents(response.data);
      } catch (error) {
        console.error('Error fetching calendar events:', error);
      }
    };

    fetchCalendarEvents();
  }, []);

  // Fetch Upcoming Events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const [upcomingRes, previousRes] = await Promise.all([
          axios.get('/api/events/upcoming'),
          axios.get('/api/events/previous')
        ]);
        setUpcomingEvents(upcomingRes.data);
        setPreviousEvents(previousRes.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  // Handle Profile Updates
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/user/profile', profile);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="account-management">
      {/* Header */}
      <div className="header">
        <div className="logo">LOGO/WEBSITE NAME</div>
         {/* Logout Button */}
         <button className="logout-button" onClick={() => {
                    // Placeholder for future logout function
                    console.log("Logging out...");
                }}>
                    Logout
                </button>
      </div>

      {/* Profile Information Section */}
      <div className="profile-section">
        <h2>Profile Information</h2>
        <hr />
        <div className="profile-info">
        <div className="profile-avatar">
          <img src={profileIcon} alt="Profile Avatar" />
        </div>
          
          {/* Profile Update Form */}
          <form className="profile-form" onSubmit={handleProfileSubmit}>
            <input 
              type="text" 
              name="firstName" 
              value={profile.firstName} 
              onChange={handleProfileChange} 
              placeholder="First Name" 
            />
            <input 
              type="text" 
              name="lastName" 
              value={profile.lastName} 
              onChange={handleProfileChange} 
              placeholder="Last Name" 
            />
            <input 
              type="email" 
              name="email" 
              value={profile.email} 
              onChange={handleProfileChange} 
              placeholder="Email" 
            />
            <input 
              type="text" 
              name="address" 
              value={profile.address} 
              onChange={handleProfileChange} 
              placeholder="Address" 
            />
            <input 
              type="text" 
              name="state" 
              value={profile.state} 
              onChange={handleProfileChange} 
              placeholder="State" 
            />
            <input 
              type="text" 
              name="zipCode" 
              value={profile.zipCode} 
              onChange={handleProfileChange} 
              placeholder="Zip Code" 
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>

      {/* Calendar and Events Section */}
      <div className="events-section">
        {/* Google Calendar */}
        <div className="calendar">
          <h3>Calendar</h3>
          {googleCalendarEvents.length > 0 ? (
            <ul>
              {googleCalendarEvents.map((event, index) => (
                <li key={index}>
                  {event.summary} - {new Date(event.start.dateTime).toLocaleString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>Please connect your Google account to view calendar events.</p>
          )}
        </div>

        {/* Upcoming Events */}
        <div className="upcoming-events">
          <h3>Upcoming Events</h3>
          <ul>
            {upcomingEvents.map((event) => (
              <li key={event._id}>{event.name}</li>
            ))}
          </ul>
        </div>

        {/* Previous Events */}
        <div className="previous-events">
          <h3>Previous Events Attended</h3>
          <ul>
            {previousEvents.map((event) => (
              <li key={event._id}>{event.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AccountManagement;


// function AccountManagement() {
//     return (
//       <div className="account-management">
//         {/* Header */}
//         <div className="header">
//           <div className="logo">LOGO/WEBSITE NAME</div>
//           <input type="text" placeholder="Search..." className="search-bar" />
//         </div>
  
//         {/* Profile Information Section */}
//         <div className="profile-section">
//           <h2>Profile Information</h2>
//           <hr></hr>
//           <div className="profile-info">
//             <div className="profile-avatar">
//               <img src="profile-icon.png" alt="Profile Avatar" />
//             </div>
            
//             {/* User should be able to see their information but also update/post their changes and it displays the correct version*/}
//             <form className="profile-form">
//               <input type="text" placeholder="First Name" />
//               <input type="text" placeholder="Last Name" />
//               <input type="password" placeholder="Password" />
//               <input type="password" placeholder="New Password" />
//               <input type="email" placeholder="Email" />
//               <input type="text" placeholder="Address" />
//               <input type="text" placeholder="State" />
//               <input type="text" placeholder="Zip Code" />
//               <button type="submit">Save</button>
//             </form>
//           </div>
//         </div>
  
//         {/* Calendar and Events Section */}
//         <div className="events-section">
//           <div className="calendar">
//           {/* Change code once implementing the active month and year function so it changes based on time */}
//           <h3>October 2024</h3>
//           {/* Contains google calangar where it needs to connect with the API and user email so they can login and see it.*/}
//               <table>
//                   <iframe 
//                   src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FNew_York&bgcolor=%23B39DDB&src=a2lhbmF0cnVvbmcwM0BnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%230B8043"
//                   style={{ border: 'solid 1px #777' }} 
//                   width="550" 
//                   height="400" 
//                   frameBorder="0" 
//                   scrolling="no">
//                   </iframe>
//               </table>
//           </div>
  
          
//           <div className="upcoming-events">
//             <h3>Upcoming Events</h3>
//             {/* A list that have <a> links that the User saved to go to so they can click for upcoming events that they can attend */}
//             <ul className="upcomining-boxes">
//               <li>Dessert Festival</li>
//               <li>Cupcake Center</li>
//               <li>Dessert Festival</li>
//               <button type="click">More</button>
//             </ul>
//           </div>
  
//           <div className="previous-events">
//             <h3>Previous Events Attended</h3>
//             <ul className="previous-boxes">
//                  {/* A list of <a> links that shows the users previous events attended */}
//               <li>Bakery Festival</li>
//               <li>Bakery Festival</li>
//               <li>Bakery Festival</li>
//               <button type="click">More</button>
//             </ul>
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   export default AccountManagement;