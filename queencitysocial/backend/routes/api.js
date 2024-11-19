// const express = require('express');
// const router = express.Router();
// const authenticate = require('../middleware/authenticate'); // Adjust the path as needed
// const userController = require('../controllers/userController');
// const calendarController = require('../controllers/calendarController');
// const eventsController = require('../controllers/eventsController');

// // Route to update user profile
// router.get('/user/profile', authenticate, getUserProfile);
// router.put('/user/profile', authenticate, updateUserProfile);

// // module.exports = router;


// // router.get('/profile', userController.getProfile);
// // router.put('/profile', userController.updateProfile);

// // Calendar Routes
// router.get('/calendar', calendarController.getCalendarEvents);

// // Events Routes
// router.get('/events/upcoming', eventsController.getUpcomingEvents);
// router.get('/events/previous', eventsController.getPreviousEvents);
// router.put('/events/attend/:eventId', eventsController.markEventAsAttended);

// module.exports = router;

const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate'); // Adjust the path as needed
const userController = require('../controllers/userController');
const calendarController = require('../controllers/calendarController');
const eventsController = require('../controllers/eventsController');

<<<<<<< HEAD
// Profile Routes
// router.get('/user/profile', userController.getProfile);
// router.put('/user/profile', userController.updateProfile);
=======
// User Profile Routes
router.get('/profile', userController.profile);
router.put('/user/profile', authenticate, userController.updateUserProfile);

// POST /users/logout: Logout user
router.post('/logout', userController.logout);

module.exports = router;

>>>>>>> d09685346f0438becfd1a7e4244a1dfa5b9d137b

// Calendar Routes
// router.get('/calendar', calendarController.getCalendarEvents);

// Events Routes
router.get('/events/upcoming', eventsController.getUpcomingEvents);
router.get('/events/previous', eventsController.getPreviousEvents);
router.put('/events/attend/:eventId', eventsController.markEventAsAttended);

module.exports = router;

