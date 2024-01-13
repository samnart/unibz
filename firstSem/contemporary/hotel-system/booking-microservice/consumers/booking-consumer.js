// booking-microservice/consumers/booking-consumer.js

const amqp = require('amqplib');
const mongoose = require('mongoose');
const Booking = require('./models/Booking'); // Adjust the path based on your project structure

const startBookingConsumer = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'booking_queue';

    await channel.assertQueue(queue, { durable: false });

    console.log(`[*] Booking Consumer waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(queue, async (message) => {
      const newBooking = JSON.parse(message.content.toString());
      
      // Save the new booking to the local database
      await Booking.create(newBooking);

      console.log('Received new booking:', newBooking);
    }, { noAck: true });
  } catch (error) {
    console.error('Error starting Booking Consumer', error);
  }
};

startBookingConsumer();
