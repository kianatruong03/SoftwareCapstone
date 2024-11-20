const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

// Debug dotenv loading
console.log('dotenv loaded:', dotenv.config());

// Debug all environment variables
console.log('Environment Variables:', process.env);

// Debug the MongoDB connection URI
console.log('Connecting to:', process.env.MONGO_URI);

const app = express();

mongoose.set('debug', true); // Enable Mongoose debugging

// Middleware
app.use(cors({
  origin: 'http://localhost:5001', // Allow requests from your frontend URL
  credentials: true,
}));
app.use(express.json()); // Parses JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit the application if the database connection fails
  });

// Routes
app.use('/api/users', require('./routes/api')); // Adjust path if needed
app.use('/auth', require('./routes/auth')); // Adjust path if needed

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the User Management API');
});

// Server setup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});