import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profileIcon from '../Photos/Profile-icon.png';
import Logo from '../Photos/CapstoneLogo.png';
import '../css/main.css';

function AccountManagement() {
  // Remove the profile state since we'll use static data
  const profile = {
    firstName: "Kiana",
    lastName: "Truong",
    email: "kianatruong03@gmail.com",
    address: "123 Random Road",
    state: "NC",
    zipCode: "12345"
  };
  
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [previousEvents, setPreviousEvents] = useState([]);
  const [googleCalendarEvents, setGoogleCalendarEvents] = useState([]);

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

  return (
    <div className="container-fluid">
      {/* Header */}
      <div className="row py-3" style={{ backgroundColor: "#85baa1" }}>
        <div className="col-12 d-flex justify-content-between align-items-center">
          <a href="/home">
            <img src={Logo} alt="Logo" className="img-fluid" style={{ maxHeight: '80px' }} />
          </a>
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem('authToken');
              window.location.href = '/login';
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="container mt-5">
        {/* Profile Information Section */}
        <div className="card mb-5" style={{backgroundColor:'#F2F1F1'}}>
          <div className="card-body" style={{padding:35}}>
            <h2 className="card-title mb-4" style={{padding:10}}>Profile Information</h2>
            <hr />
            <div className="row">
              <div className="col-md-3 text-center mb-3">
                <img src={profileIcon} alt="Profile Avatar" className="img-fluid rounded-circle mb-3" style={{ maxWidth: '200px' }} />
              </div>
              
              <div className="col-md-9">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <div 
                      className="form-control"
                      style={{
                        borderRadius: '20px',
                        padding: '10px 10px',
                        backgroundColor: '#f8f9fa'
                      }}
                    >
                      {profile.firstName}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <div 
                      className="form-control"
                      style={{
                        borderRadius: '20px',
                        padding: '10px 10px',
                        backgroundColor: '#f8f9fa'
                      }}
                    >
                      {profile.lastName}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Email</label>
                    <div 
                      className="form-control"
                      style={{
                        borderRadius: '20px',
                        padding: '10px 10px',
                        backgroundColor: '#f8f9fa'
                      }}
                    >
                      {profile.email}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <label className="form-label">Address</label>
                    <div 
                      className="form-control"
                      style={{
                        borderRadius: '20px',
                        padding: '10px 10px',
                        backgroundColor: '#f8f9fa'
                      }}
                    >
                      {profile.address}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">State</label>
                    <div 
                      className="form-control"
                      style={{
                        borderRadius: '20px',
                        padding: '10px 10px',
                        backgroundColor: '#f8f9fa'
                      }}
                    >
                      {profile.state}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Zip Code</label>
                    <div 
                      className="form-control"
                      style={{
                        borderRadius: '20px',
                        padding: '10px 10px',
                        backgroundColor: '#f8f9fa'
                      }}
                    >
                      {profile.zipCode}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar and Events Section */}
        <div className="row">
          {/* Google Calendar */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body" style={{backgroundColor:'#ceeddb'}}>
                <h3 className="card-title">Calendar</h3>
                <div className="calendar-container" style={{ textAlign: 'center' }}>
                  <iframe
                    src="https://calendar.google.com/calendar/embed?src=b8f8019b90d4367085e32f9f9ac159463b818bb1cb5bba27f50230b7c45bf672%40group.calendar.google.com&ctz=America%2FNew_York"
                    style={{ border: 0 }}
                    width="300"
                    height="300"
                    frameBorder="0"
                    scrolling="no"
                    title="Google Calendar"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body" style={{ backgroundColor: '#67597A', color:'white'}}>
                <h3 className="card-title">Upcoming Events</h3>
                <ul className="list-group list-group-flush">
                  {upcomingEvents.map((event) => (
                    <li key={event._id} className="list-group-item">{event.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Previous Events */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body" style={{ backgroundColor: '#D9D9D9'}}>
                <h3 className="card-title">Previous Events Attended</h3>
                <ul className="list-group list-group-flush">
                  {previousEvents.map((event) => (
                    <li key={event._id} className="list-group-item">{event.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountManagement;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import profileIcon from '../Photos/Profile-icon.png';
// import Logo from '../Photos/CapstoneLogo.png';
// import '../css/main.css';

// function AccountManagement() {
//   const [profile, setProfile] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     address: '',
//     state: '',
//     zipCode: '',
//   });
//   const [upcomingEvents, setUpcomingEvents] = useState([]);
//   const [previousEvents, setPreviousEvents] = useState([]);
//   const [googleCalendarEvents, setGoogleCalendarEvents] = useState([]);

//   const ReadOnlyProfile = () => {
//     const profile = {
//       firstName: "Sarah",
//       lastName: "Thompson",
//       email: "sarah.thompson@example.com",
//       address: "742 Maple Avenue",
//       state: "California",
//       zipCode: "94105"
//     };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get('/api/user/profile');
//         setProfile(response.data);
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//       }
//     };
    
//     fetchProfile();
//   }, []);

//   useEffect(() => {
//     const fetchCalendarEvents = async () => {
//       try {
//         const response = await axios.get('/api/calendar');
//         setGoogleCalendarEvents(response.data);
//       } catch (error) {
//         console.error('Error fetching calendar events:', error);
//       }
//     };

//     fetchCalendarEvents();
//   }, []);

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const [upcomingRes, previousRes] = await Promise.all([
//           axios.get('/api/events/upcoming'),
//           axios.get('/api/events/previous')
//         ]);
//         setUpcomingEvents(upcomingRes.data);
//         setPreviousEvents(previousRes.data);
//       } catch (error) {
//         console.error('Error fetching events:', error);
//       }
//     };

//     fetchEvents();
//   }, []);

//   const handleProfileChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put('/api/user/profile', profile);
//       alert('Profile updated successfully');
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       alert('Failed to update profile');
//     }
//   };

//   return (
//     <div className="container-fluid">
//       {/* Header */}
//       <div className="row py-3" style={{ backgroundColor: "#85baa1" }}>
//         <div className="col-12 d-flex justify-content-between align-items-center">
//           <a href="/home">
//             <img src={Logo} alt="Logo" className="img-fluid" style={{ maxHeight: '80px' }} />
//           </a>
//           <button
//             className="btn btn-danger"
//             onClick={() => {
//               localStorage.removeItem('authToken'); // Clear token from localStorage
//               window.location.href = '/login'; // Redirect to login page
//             }}
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       <div className="container mt-5">
//         {/* Profile Information Section */}
//         <div className="card mb-5" style={{backgroundColor:'#F2F1F1'}}>
//           <div className="card-body">
//             <h2 className="card-title mb-4" style={{padding:15}}>Profile Information</h2>
//             <hr />
//             <div className="row">
//               <div className="col-md-3 text-center mb-3">
//                 <img src={profileIcon} alt="Profile Avatar" className="img-fluid rounded-circle mb-3" style={{ maxWidth: '200px' }} />
//               </div>
              
//               <div className="col-md-9">
//                 <form onSubmit={handleProfileSubmit}>
//                   <div className="row g-3">
//                     <div className="col-md-6">
//                       <input 
//                         type="text" 
//                         className="form-control"
//                         name="firstName" 
//                         value={profile.firstName} 
//                         onChange={handleProfileChange} 
//                         placeholder="First Name" 
//                         style={{
//                           borderRadius: '20px',
//                           padding: '10px 10px' }}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <input 
//                         type="text" 
//                         className="form-control"
//                         name="lastName" 
//                         value={profile.lastName} 
//                         onChange={handleProfileChange} 
//                         placeholder="Last Name" 
//                         style={{
//                           borderRadius: '20px',
//                           padding: '10px 10px' }}
//                       />
//                     </div>
//                     <div className="col-md-12">
//                       <input 
//                         type="email" 
//                         className="form-control"
//                         name="email" 
//                         value={profile.email} 
//                         onChange={handleProfileChange} 
//                         placeholder="Email" 
//                         style={{
//                           borderRadius: '20px',
//                           padding: '10px 10px' }}
//                       />
//                     </div>
//                     <div className="col-md-12">
//                       <input 
//                         type="text" 
//                         className="form-control"
//                         name="address" 
//                         value={profile.address} 
//                         onChange={handleProfileChange} 
//                         placeholder="Address" 
//                         style={{
//                           borderRadius: '20px',
//                           padding: '10px 10px' }}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <input 
//                         type="text" 
//                         className="form-control"
//                         name="state" 
//                         value={profile.state} 
//                         onChange={handleProfileChange} 
//                         placeholder="State" 
//                         style={{
//                           borderRadius: '20px',
//                           padding: '10px 10px' }}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <input 
//                         type="text" 
//                         className="form-control"
//                         name="zipCode" 
//                         value={profile.zipCode} 
//                         onChange={handleProfileChange} 
//                         placeholder="Zip Code" 
//                         style={{
//                           borderRadius: '20px',
//                           padding: '10px 10px' }}
//                       />
//                     </div>
//                     <div className="col-12">
//                       <button type="submit" className="btn btn-primary" style={{backgroundColor:'#6e8894',  borderRadius: '20px'}}>Save</button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Calendar and Events Section */}
//         <div className="row">
//           {/* Google Calendar */}
//           <div className="col-md-4 mb-4">
//             <div className="card h-100">
//               <div className="card-body" style={{backgroundColor:'#ceeddb'}}>
//                 <h3 className="card-title">Calendar</h3>
//                 <div className="calendar-container" style={{ textAlign: 'center' }}>
//                 <iframe
//                   src="https://calendar.google.com/calendar/embed?src=b8f8019b90d4367085e32f9f9ac159463b818bb1cb5bba27f50230b7c45bf672%40group.calendar.google.com&ctz=America%2FNew_York"
//                   style={{ border: 0 }}
//                   width="300"
//                   height="300"
//                   frameBorder="0"
//                   scrolling="no"
//                   title="Google Calendar"
//                 ></iframe>
//               </div>
//               </div>
//             </div>
//           </div>

//           {/* Upcoming Events */}
//           <div className="col-md-4 mb-4">
//             <div className="card h-100">
//               <div className="card-body" style={{ backgroundColor: '#67597A', color:'white'}}>
//                 <h3 className="card-title">Upcoming Events</h3>
//                 <ul className="list-group list-group-flush">
//                   {upcomingEvents.map((event) => (
//                     <li key={event._id} className="list-group-item">{event.name}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* Previous Events */}
//           <div className="col-md-4 mb-4">
//             <div className="card h-100">
//               <div className="card-body" style={{ backgroundColor: '#D9D9D9'}}>
//                 <h3 className="card-title">Previous Events Attended</h3>
//                 <ul className="list-group list-group-flush">
//                   {previousEvents.map((event) => (
//                     <li key={event._id} className="list-group-item">{event.name}</li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AccountManagement;