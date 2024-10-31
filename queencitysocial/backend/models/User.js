const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  address: String,
  state: String,
  zipCode: String,
  googleId: String,  // Store Google ID if connected
  upcomingEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  attendedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
