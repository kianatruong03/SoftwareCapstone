const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/api'); // Adjust path if needed
const authRoutes = require('./routes/auth'); // Adjust path if needed

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // body-parser middleware (can use express.json() directly in newer versions)
app.use(express.json()); // Parses JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('MongoDB connection error:', error));

// Routes
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the User Management API');
});

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5001, () => console.log('Server running on port 5001'));
  })
  .catch(err => console.log(err));
