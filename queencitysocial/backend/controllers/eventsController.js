const Event = require('../models/Event');

// Get Upcoming Events
exports.getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({ date: { $gte: new Date() } });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get Previous Events
exports.getPreviousEvents = async (req, res) => {
  try {
    const events = await Event.find({ date: { $lt: new Date() } });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Mark Event as Attended
exports.markEventAsAttended = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const user = await User.findById(req.user.id);
    user.events.previous.push(eventId);
    await user.save();
    res.json({ message: 'Event marked as attended' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
