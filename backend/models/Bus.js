// backend/models/Bus.js
const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Bus name is required'],
    trim: true,
  },
  route: {
    type: String,
    required: [true, 'Route is required'],
    trim: true,
  },
  totalSeats: {
    type: Number,
    required: [true, 'Total number of seats is required'],
    min: [1, 'There must be at least one seat'],
  },
  availableSeats: {
    type: [Number],
    required: [true, 'Available seats are required'],
    validate: {
      validator: function(seats) {
        return seats.length <= this.totalSeats;
      },
      message: 'Number of available seats cannot exceed total seats',
    },
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Bus', busSchema);
