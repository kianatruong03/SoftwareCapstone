const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Route to get user profile information
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('upcomingEvents attendedEvents');
    res.json(user);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// Route to save user profile updates
router.post('/profile', async (req, res) => {
  try {
    const { firstName, lastName, address, state, zipCode } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { firstName, lastName, address, state, zipCode }, { new: true });
    res.json(user);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
