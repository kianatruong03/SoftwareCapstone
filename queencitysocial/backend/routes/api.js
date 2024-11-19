const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const calendarController = require('../controllers/calendarController');
const eventsController = require('../controllers/eventsController');

// Profile Routes
// router.get('/user/profile', userController.getProfile);
// router.put('/user/profile', userController.updateProfile);

// Calendar Routes
// router.get('/calendar', calendarController.getCalendarEvents);

// Events Routes
router.get('/events/upcoming', eventsController.getUpcomingEvents);
router.get('/events/previous', eventsController.getPreviousEvents);
router.put('/events/attend/:eventId', eventsController.markEventAsAttended);

module.exports = router;
