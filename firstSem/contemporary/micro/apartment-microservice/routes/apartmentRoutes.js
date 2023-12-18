// routes/apartmentRoutes.js

const express = require('express');
const router = express.Router();
const apartmentController = require('../controllers/apartmentController');

// Define apartment routes
router.get('/apartment', apartmentController.getApartments);

module.exports = router;