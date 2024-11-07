// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const MongoStore = require('connect-mongo');

// Import routes
const authRoutes = require('./routes/auth');
const busRoutes = require('./routes/buses');
const bookingRoutes = require('./routes/bookings');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000', // Adjust the port if needed
  credentials: true,
}));

app.use(session({
  secret: 'your_secret_key', // Replace with your own secret
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: 'mongodb://localhost:27017/bus_booking_sessions',
  }),
  cookie: {
    maxAge: 30 * 60 * 1000, // 30 minutes
    httpOnly: true,
    secure: false, // Set to true if using HTTPS
    sameSite: 'lax',
  },
}));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bus_booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error(err);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/buses', busRoutes);
app.use('/api/bookings', bookingRoutes);

// Serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
