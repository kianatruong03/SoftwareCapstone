// server.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 5001;

app.get('/home', async (req, res) => {
  const url = "https://api.predicthq.com/v1/events/";
  const headers = {
    Authorization: `Bearer ${process.env.API_KEY}`,
    Accept: "application/json"
  };

  const currentDate = new Date().toISOString().split('T')[0];
  const { q, categories, location, distance, page, limit } = req.query;

  // Convert selected categories from a comma-separated string to an array, if they exist
  const categoryList = categories ? categories.split(',') : [];

  const params = {
    within: distance ? `${distance}mi@${location || '35.2271,-80.8431'}` : '15mi@35.2271,-80.8431',
    "active.gte": currentDate,
    limit: limit || 10,
    offset: (page - 1) * (limit || 10),
  };

  try {
    const response = await axios.get(url, { headers, params });
    let events = response.data.results;

    // Filter events based on the search query and selected categories
    if (q) {
      const searchQuery = q.toLowerCase();
      events = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery) ||
        event.category.toLowerCase().includes(searchQuery) ||
        (event.labels && event.labels.some(label => label.toLowerCase().includes(searchQuery)))
      );
    }

    // Apply category filtering if categories are provided
    if (categoryList.length > 0) {
      events = events.filter(event => categoryList.includes(event.category) || event.labels.some(label => categoryList.includes(label)));
    }

    res.json(events);
  } catch (error) {
    console.error("Error fetching data from PredictHQ:", error.message);
    res.status(error.response?.status || 500).send(error.response?.statusText || "Internal Server Error");
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
