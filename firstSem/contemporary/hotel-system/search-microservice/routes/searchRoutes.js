// search-microservice/routes/searchRoutes.js

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/search', searchController.searchHandler);

module.exports = router;
