const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  address: String,
  state: String,
  zipCode: String,
  googleToken: String, // For Google Calendar API access
  events: {
    upcoming: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    previous: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  }
});

module.exports = mongoose.model('User', userSchema);
