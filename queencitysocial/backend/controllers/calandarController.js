// controllers/calendarController.js
const { google } = require('googleapis');
const User = require('../models/User');
const { oauth2Client } = require('../utils/googleAuth');

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

exports.getEvents = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items.map(event => ({
      title: event.summary,
      date: event.start.dateTime || event.start.date,
    }));

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};
