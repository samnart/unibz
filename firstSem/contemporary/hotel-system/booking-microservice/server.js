// booking-microservice/server.js

const express = require('express');
const mongoose = require('mongoose');
const bookingRoutes = require('./routes/bookingRoutes');
const getDatabaseConfig = require('./config/database');

const app = express();

const bookingMicroserviceDbConfig = getDatabaseConfig('booking_microservice');
mongoose.connect(bookingMicroserviceDbConfig.database, bookingMicroserviceDbConfig.options);

app.use(express.json());
app.use('/api', bookingRoutes);

const port = process.env.PORT || 3003;
app.listen(port, () => {
  console.log(`Booking Microservice is running on port ${port}`);
});
