const User = require('../models/User');
const { getGoogleCalendarEvents } = require('../services/googleCalendarService');

exports.updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const calendarEvents = await getGoogleCalendarEvents(req.user.email);
    res.json({ ...user._doc, googleCalendarEvents: calendarEvents });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile data' });
  }
};
