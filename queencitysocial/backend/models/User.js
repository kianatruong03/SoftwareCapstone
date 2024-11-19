const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // Combining definitions
  lastName: { type: String, required: true },  // Combining definitions
  email: { type: String, required: true, unique: true }, // Combining definitions
  password: { type: String, required: true }, // Combining definitions
  address: { type: String },
  state: { type: String },
  zipCode: { type: String },
  googleToken: { type: String },
  events: {
    upcoming: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event'
    }],
    previous: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
  }
});

module.exports = mongoose.model('User', userSchema);
