// booking-microservice/controllers/bookingController.js

const Booking = require('../models/Booking');

const createBooking = async (req, res) => {
  try {
    const { accommodationId, startDate, endDate } = req.body;
    const booking = await Booking.create({ accommodationId, startDate, endDate });
    res.json({ booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createBooking, getBookings };
