// import React, { Component } from 'react';
// import { google } from 'googleapis';
// import axios from 'axios';
// import moment from 'moment';

// class

//  Calendar extends Component {
//   state = {
//     isAuthenticated: false,
//     events: [],
//     error: null,
//   };

//   // Initialize the Google OAuth 2.0 client
//   initClient() {
//     const { REACT_APP_CLIENT_ID, REACT_APP_API_KEY } = process.env;
//     const SCOPES = 'https://www.googleapis.com/auth/calendar';

//     const gapi = window.gapi;

//     gapi.load('client:auth2', () => {
//       gapi.client
//         .init({
//           apiKey: REACT_APP_API_KEY,
//           clientId: REACT_APP_CLIENT_ID,
//           discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
//           scope: SCOPES,
//         })
//         .then(() => {
//           // Listen for sign-in state changes
//           gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

//           // Handle the initial sign-in state
//           this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//         });
//     });
//   }

//   handleAuthClick() {
//     const gapi = window.gapi;

//     gapi.auth2.getAuthInstance().signIn();
//   }
//    // Function to update sign-in status
//   updateSigninStatus(isSignedIn) {
//     this.setState({ isAuthenticated: isSignedIn });

//     if (isSignedIn) {
//       // If the user is signed in, fetch their calendar events
//       this.fetchCalendarEvents();
//     }
//   }

//     // Function to handle user sign-out
//   handleSignoutClick() {
//     const gapi = window.gapi;

//     gapi.auth2.getAuthInstance().signOut();
//   }

//   render() {
//     const { isAuthenticated } = this.state;

//     return (
//       <div>
//         {isAuthenticated ? (
//           <div>
//             <button onClick={this.handleSignoutClick}>Sign Out</button>
//           </div>
//         ) : (
//           <div>
//             <button onClick={this.handleAuthClick}>Sign In with Google</button>
//           </div>
//         )}
//       </div>
//     );
//   }

//   componentDidMount() {
//     const gapi = window.gapi;

//     gapi.load('client:auth2', this.initClient);
//   }

//   //Calendar

//   fetchCalendarEvents() {
//     const { isAuthenticated } = this.state;

//     if (isAuthenticated) {
//       const gapi = window.gapi;
//       const calendar = gapi.client.calendar;

//       calendar.events
//         .list({
//           calendarId: 'primary', // Use 'primary' for the user's primary calendar
//           timeMin: new Date().toISOString(),
//           showDeleted: false,
//           singleEvents: true,
//           maxResults: 10, // Maximum number of events to fetch
//           orderBy: 'startTime',
//         })
//         .then((response) => {
//           const events = response.result.items;
//           this.setState({ events });
//         })
//         .catch((error) => {
//           this.setState({ error });
//         });
//     }
//   }

//    // Function to render calendar events
//    renderEvents() {
//     const { events } = this.state;

//     if (events.length === 0) {
//       return <p>No upcoming events</p>;
//     }

//     return (
//       <ul>
//         {events.map((event) => (
//           <li key={event.id}>
//             <strong>{event.summary}</strong> -{' '}
//             {moment(event.start.dateTime).format('LLL')}
//           </li>
//         ))}
//       </ul>
//     );
//     }

//     render() {
//         const { isAuthenticated, error } = this.state;
    
//         return (
//           <div>
//             {error && <p>Error: {error.message}</p>}
//             {isAuthenticated ? (
//               <div>
//                 <button onClick={this.handleSignoutClick}>Sign Out</button>
//                 <h2>Upcoming Events</h2>
//                 {this.renderEvents()}
//               </div>
//             ) : (
//               <div>
//                 <button onClick={this.handleAuthClick}>Sign In with Google</button>
//               </div>
//             )}
//           </div>
//         );
//       }

//       createEvent() {
//         const gapi = window.gapi;
//         const calendar = gapi.client.calendar;
    
//         // Define the event details (you can customize this)
//         const event = {
//           summary: 'New Event',
//           location: 'Event Location',
//           description: 'Event Description',
//           start: {
//             dateTime: new Date().toISOString(),
//             timeZone: 'UTC',
//           },
//           end: {
//             dateTime: new Date().toISOString(),
//             timeZone: 'UTC',
//           },
//         };
    
//         calendar.events
//           .insert({
//             calendarId: 'primary',
//             resource: event,
//           })
//           .then((response) => {
//             // The newly created event response
//             const createdEvent = response.result;
//             console.log('Event created:', createdEvent);
    
//             // Optionally, fetch updated events to refresh the list
//             this.fetchCalendarEvents();
//           })
//           .catch((error) => {
//             this.setState({ error });
//           });
//       }

//       render() {
//         const { isAuthenticated, error } = this.state;
    
//         return (
//           <div>
//             {error && <p>Error: {error.message}</p>}
//             {isAuthenticated ? (
//               <div>
//                 <button onClick={this.handleSignoutClick}>Sign Out</button>
//                 <h2>Upcoming Events</h2>
//                 <button onClick={this.createEvent}>Create Event</button>
//                 {this.renderEvents()}
//               </div>
//             ) : (
//               <div>
//                 <button onClick={this.handleAuthClick}>Sign In with Google</button>
//               </div>
//             )}
//           </div>
//         );
//       }

//       updateEvent(eventId, updatedEvent) {
//         const gapi = window.gapi;
//         const calendar = gapi.client.calendar;
    
//         calendar.events
//           .update({
//             calendarId: 'primary',
//             eventId,
//             resource: updatedEvent,
//           })
//           .then((response) => {
//             // The updated event response
//             const updatedEvent = response.result;
//             console.log('Event updated:', updatedEvent);
    
//             // Optionally, fetch updated events to refresh the list
//             this.fetchCalendarEvents();
//           })
//           .catch((error) => {
//             this.setState({ error });
//           });
//         }

//     // Function to check if the Google API client is loaded
//   isGoogleApiLoaded() {
//     return window.gapi && window.gapi.client;
//   }


// }
// export default Calendar; 

import React, { Component } from 'react';
import moment from 'moment';

class Calendar extends Component {
  state = {
    isAuthenticated: false,
    events: [],
    error: null,
  };

  componentDidMount() {
    this.loadGoogleApi();
  }

  // Load the Google API
  loadGoogleApi = () => {
    const gapi = window.gapi;

    if (!gapi) {
      console.error('Google API script is not loaded.');
      return;
    }

    gapi.load('client:auth2', this.initClient);
  };

  // Initialize the Google OAuth 2.0 client
  initClient = () => {
    const { REACT_APP_CLIENT_ID, REACT_APP_API_KEY } = process.env;
    const SCOPES = 'https://www.googleapis.com/auth/calendar';

    const gapi = window.gapi;

    gapi.client
      .init({
        apiKey: REACT_APP_API_KEY,
        clientId: REACT_APP_CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: SCOPES,
      })
      .then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        authInstance.isSignedIn.listen(this.updateSigninStatus);
        this.updateSigninStatus(authInstance.isSignedIn.get());
      })
      .catch((error) => {
        console.error('Error initializing Google API client:', error);
        this.setState({ error });
      });
  };

  // Update the sign-in status
  updateSigninStatus = (isSignedIn) => {
    this.setState({ isAuthenticated: isSignedIn });

    if (isSignedIn) {
      this.fetchCalendarEvents();
    }
  };

  // Handle user sign-in
  handleAuthClick = () => {
    const gapi = window.gapi;
    gapi.auth2.getAuthInstance().signIn();
  };

  // Handle user sign-out
  handleSignoutClick = () => {
    const gapi = window.gapi;
    gapi.auth2.getAuthInstance().signOut();
  };

  // Fetch calendar events
  fetchCalendarEvents = () => {
    const gapi = window.gapi;
    const calendar = gapi.client.calendar;

    calendar.events
      .list({
        calendarId: 'primary',
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
      })
      .then((response) => {
        const events = response.result.items;
        this.setState({ events });
      })
      .catch((error) => {
        console.error('Error fetching calendar events:', error);
        this.setState({ error });
      });
  };

  // Create a new calendar event
  createEvent = () => {
    const gapi = window.gapi;
    const calendar = gapi.client.calendar;

    const event = {
      summary: 'New Event',
      location: 'Event Location',
      description: 'Event Description',
      start: {
        dateTime: new Date().toISOString(),
        timeZone: 'UTC',
      },
      end: {
        dateTime: new Date(new Date().getTime() + 3600000).toISOString(), // 1 hour later
        timeZone: 'UTC',
      },
    };

    calendar.events
      .insert({
        calendarId: 'primary',
        resource: event,
      })
      .then((response) => {
        console.log('Event created:', response.result);
        this.fetchCalendarEvents();
      })
      .catch((error) => {
        console.error('Error creating event:', error);
        this.setState({ error });
      });
  };

  // Render the events
  renderEvents = () => {
    const { events } = this.state;

    if (events.length === 0) {
      return <p>No upcoming events</p>;
    }

    return (
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.summary}</strong> - {moment(event.start.dateTime).format('LLL')}
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { isAuthenticated, error } = this.state;

    return (
      <div>
        {error && <p>Error: {error.message}</p>}
        {isAuthenticated ? (
          <div>
            <button onClick={this.handleSignoutClick}>Sign Out</button>
            <h2>Upcoming Events</h2>
            <button onClick={this.createEvent}>Create Event</button>
            {this.renderEvents()}
          </div>
        ) : (
          <div>
            <button onClick={this.handleAuthClick}>Sign In with Google</button>
          </div>
        )}
      </div>
    );
  }
}

export default Calendar;
