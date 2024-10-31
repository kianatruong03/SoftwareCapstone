const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/', passport.authenticate('google', { scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar.readonly'] }));
router.get('/callback', passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect('/'));

module.exports = router;
