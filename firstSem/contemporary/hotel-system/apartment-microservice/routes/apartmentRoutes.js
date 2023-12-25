// apartment-microservice/routes/apartmentRoutes.js

const express = require('express');
const router = express.Router();
const apartmentController = require('../controllers/apartmentController');

router.get('/apartments', apartmentController.getApartments);

module.exports = router;
