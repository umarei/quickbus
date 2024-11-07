// backend/controllers/busController.js
const Bus = require('../models/Bus');

exports.getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAvailableSeats = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.status(200).json(bus.availableSeats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
