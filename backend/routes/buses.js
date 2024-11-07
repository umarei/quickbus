// backend/routes/buses.js
const express = require('express');
const router = express.Router();
const busController = require('../controllers/busController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, busController.getAllBuses);
router.get('/:id/seats', authMiddleware, busController.getAvailableSeats);

module.exports = router;
