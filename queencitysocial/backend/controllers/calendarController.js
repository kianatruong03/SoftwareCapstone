const { google } = require('googleapis');

// Setup Google Calendar API
exports.getCalendarEvents = async (req, res) => {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.REDIRECT_URI
    );
    oauth2Client.setCredentials({ access_token: req.user.googleToken });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    const events = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    res.json(events.data.items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching calendar events' });
  }
};
