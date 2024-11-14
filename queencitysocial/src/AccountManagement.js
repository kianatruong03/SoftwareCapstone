import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profileIcon from './Photos/Profile-icon.png';
import Logo from './Photos/CapstoneLogo.png';
import './Collective.css';

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
      <div className="account-header">
        {/* <div className="CapstoneLogo"> */}
          <img src={Logo} alt="Profile Avatar" />
        {/* </div> */}
         {/* Logout Button */}
         <button className="account-logout-button" onClick={() => {
                console.log("Logging out...");
            }}>
              Logout
          </button>
      </div>

      {/* Profile Information Section */}
      <div className="account-profile-section">
        <h2>Profile Information</h2>
        <hr />
        <div className="account-profile-info">
        <div className="account-profile-avatar">
          <img src={profileIcon} alt="Profile Avatar" />
        </div>
          
          {/* Profile Update Form */}
          <form className="account-profile-form" onSubmit={handleProfileSubmit}>
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
      <div className="account-events-section">
        {/* Google Calendar */}
        <div className="account-calendar">
          <h3>Calendar</h3>
          {googleCalendarEvents.length > 0 ? (
            <ul className="account-ul">
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
        <div className="account-upcoming-events">
          <h3>Upcoming Events</h3>
          <ul className="account-ul">
            {upcomingEvents.map((event) => (
              <li className="account-li" key={event._id}>{event.name}</li>
            ))}
          </ul>
        </div>

        {/* Previous Events */}
        <div className="account-previous-events">
          <h3 className="h3-account">Previous Events Attended</h3>
          <ul className="account-ul">
            {previousEvents.map((event) => (
              <li className="account-li" key={event._id}>{event.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AccountManagement;
