// routes/searchRoutes.js

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Define search routes
router.get('/search', searchController.searchAccommodations);

module.exports = router;