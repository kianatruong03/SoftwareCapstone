// Load environment variables from the .env file
require('dotenv').config();
const axios = require('axios');

// Define the API endpoint and your API key
const url = "https://api.predicthq.com/v1/events/";
const apiKey = process.env.API_KEY;

const currentDate = new Date().toISOString().split('T')[0];
// Define the query parameters
const params = {
    within: "15mi@35.2271,-80.8431",   // Charlotte, NC latitude and longitude
    "active.gte": currentDate,        // Start date
    "active.tz": "America/New_York",   // Time zone
    sort: "start"
    };

// Set up the headers, including authorization
const headers = {
    Authorization: `Bearer ${apiKey}`,
    Accept: "application/json"
};

// Function to fetch events
async function fetchEvents() {
    try {
        const response = await axios.get(url, { headers, params });
        console.log(response.data); // Print or process the JSON response
    } catch (error) {
        console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
    }
}

fetchEvents();
