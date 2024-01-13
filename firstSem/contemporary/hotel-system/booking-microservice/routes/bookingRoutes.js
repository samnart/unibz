// booking-microservice/routes/bookingRoutes.js

const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

module.exports = (channel) => {
    router.post('/bookings', async (req, res) => {
        try {
            const { accommodationId, startDate, endDate } = req.body;
            const booking = {
                accommodationId,
                startDate,
                endDate,
            };

            // Send a message to RabbitMQ when a new booking is created
            channel.sendToQueue('booking_queue', Buffer.from(JSON.stringify(booking)));

            res.json({ booking });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    router.get('/bookings', bookingController.getBookings);

    return router;
};

// router.post('/bookings', bookingController.createBooking);
// router.get('/bookings', bookingController.getBookings);

// module.exports = router;
