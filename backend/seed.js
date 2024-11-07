// backend/seed.js
require('dotenv').config(); // Loads environment variables from .env
const mongoose = require('mongoose');
const Bus = require('./models/Bus'); // Adjust the path if necessary

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bus_booking', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB for seeding');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Define bus data
const buses = [
  {
    name: 'Express Line',
    route: 'City A to City B',
    totalSeats: 40,
    availableSeats: Array.from({ length: 40 }, (_, i) => i + 1),
  },
  {
    name: 'Premium Travels',
    route: 'City C to City D',
    totalSeats: 35,
    availableSeats: Array.from({ length: 35 }, (_, i) => i + 1),
  },
  {
    name: 'Luxury Coaches',
    route: 'City E to City F',
    totalSeats: 50,
    availableSeats: Array.from({ length: 50 }, (_, i) => i + 1),
  },
  // Add more buses as needed
];

// Function to seed the database
const seedDB = async () => {
  try {
    // Clear existing data
    await Bus.deleteMany({});
    console.log('Existing bus data cleared');

    // Insert new bus data
    await Bus.insertMany(buses);
    console.log('Bus data inserted successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
};

// Execute the seed function
seedDB();
