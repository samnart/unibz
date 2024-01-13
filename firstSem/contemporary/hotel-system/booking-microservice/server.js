// booking-microservice/server.js

const express = require('express');
const mongoose = require('mongoose');
const bookingRoutes = require('./routes/bookingRoutes');
const getDatabaseConfig = require('./config/database');
const amqp = require('amqplib');

const { rabbitmqConfig } = require('./config/database');

const app = express();

const bookingMicroserviceDbConfig = getDatabaseConfig('booking_microservice');
mongoose.connect(bookingMicroserviceDbConfig.database, bookingMicroserviceDbConfig.options);

app.use(express.json());

// Connect to RabbitMQ
const startMicroservice = async () => {
  try {
    const connection = await amqp.connect(rabbitmqConfig.url);
    const channel = await connection.createChannel();
    const queue = rabbitmqConfig.queueName;

    // Assert the queue
    await channel.assertQueue(queue, { durable: false });

    // Use the channel in the routes
    app.use('/api', bookingRoutes(channel));

    const port = process.env.PORT || 3003;
    app.listen(port, () => {
      console.log(`Booking Microservice is running on port ${port}`);
    });
  } catch (error) {
    console.log('Error starting Booking Microservice', error);
  }
};

startMicroservice();




// app.use('/api', bookingRoutes);

// const port = process.env.PORT || 3003;
// app.listen(port, () => {
//   console.log(`Booking Microservice is running on port ${port}`);
// });
