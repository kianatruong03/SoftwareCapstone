const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./config/passport')(passport); // Passport config
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const googleAuthRoutes = require('./routes/googleAuthRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/auth/google', googleAuthRoutes);

mongoose.connect('mongodb+srv://kianatruong03:QueenCitySocial@cluster0.qyhz7.mongodb.net/your_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
