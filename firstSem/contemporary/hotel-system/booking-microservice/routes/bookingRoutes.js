// // booking-microservice/routes/bookingRoutes.js

// const express = require('express');
// const router = express.Router();
// const bookingController = require('../controllers/bookingController');

// module.exports = (channel) => {
//   // POST request to create a new booking
//   router.post('/bookings', async (req, res) => {
//     try {
//       const { accommodationId, startDate, endDate } = req.body;
//       const booking = {
//         accommodationId,
//         startDate,
//         endDate,
//       };

//       // Send a message to RabbitMQ when a new booking is created
//       channel.sendToQueue('booking_queue', Buffer.from(JSON.stringify(booking)));

//       res.json({ booking });
//     } catch (error) {
//       console.error('Error creating booking:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

//   // GET request to retrieve bookings
//   router.get('/bookings', bookingController.getBookings);

//   return router;
// };

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

module.exports = () => {
  // POST request to create a new booking
  router.post('/bookings', bookingController.createBooking);

  // DELETE request to delete a booking
  router.delete('/bookings/:bookingId', bookingController.deleteBooking);

  // GET request to retrieve bookings
  router.get('/bookings', bookingController.getBookings);

  return router;
};
