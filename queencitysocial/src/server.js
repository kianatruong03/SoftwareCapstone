const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
// server.js
const PORT = 5001; // Make sure this is different from the React app port (usually 3000)

const currentDate = new Date().toISOString().split('T')[0];

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Define the /home route to fetch events
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});
app.get('/home', async (req, res) => {
    const url = "https://api.predicthq.com/v1/events/";
    const headers = {
        Authorization: `Bearer ${process.env.API_KEY}`,
        Accept: "application/json"
    };
    const params = {
        within: "15mi@35.2271,-80.8431", // Charlotte, NC
        "active.gte": currentDate,
        limit: req.query.limit || 10,
        offset: (req.query.page - 1) * req.query.limit || 0,
        sort: "start"
    };

    try {
        const response = await axios.get(url, { headers, params });
        res.json(response.data.results);
    } catch (error) {
        console.error("Error fetching data from PredictHQ:", error.message);
        res.status(error.response?.status || 500).send(error.response?.statusText || "Internal Server Error");
    }
});
