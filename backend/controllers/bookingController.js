// backend/controllers/bookingController.js
const Booking = require('../models/Booking');
const Bus = require('../models/Bus');

exports.bookSeat = async (req, res) => {
  try {
    const { busId, seatNumber } = req.body;
    const bus = await Bus.findById(busId);

    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    if (!bus.availableSeats.includes(seatNumber)) {
      return res.status(400).json({ message: 'Seat not available' });
    }

    // Remove seat from available seats
    bus.availableSeats = bus.availableSeats.filter(seat => seat !== seatNumber);
    await bus.save();

    // Create booking
    const booking = new Booking({
      userId: req.session.userId,
      busId,
      seatNumber,
    });
    await booking.save();

    res.status(201).json({ message: 'Seat booked', booking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
