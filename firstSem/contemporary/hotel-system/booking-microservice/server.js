const express = require('express');
const mongoose = require('mongoose');
const bookingRoutes = require('./routes/bookingRoutes');
const getDatabaseConfig = require('./config/database');
const amqp = require('amqplib');

const startMicroservice = async () => {
  try {
    const { database, options } = getDatabaseConfig('booking_microservice');

    await mongoose.connect(database, options);

    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();

    const queueName = 'booking_queue';

    await channel.assertQueue(queueName, { durable: false });

    const consumeBookingMessages = async () => {
      try {
        await channel.consume(queueName, (msg) => {
          const booking = JSON.parse(msg.content.toString());
          console.log('Received booking:', booking);
        }, { noAck: true });
      } catch (error) {
        console.error('Error consuming Booking messages:', error);
      }
    };

    consumeBookingMessages();

    const app = express();
    const port = process.env.PORT || 3003;

    app.use(express.json());
    app.use('/api', bookingRoutes());

    app.listen(port, () => {
      console.log(`Booking Microservice is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting Booking Microservice:', error);
    process.exit(1); 
  }
};

startMicroservice();
