// apartment-microservice/cosumers/apartment-consumer.js

const amqp = require('amqplib');
const mongoose = require('mongoose');
const Apartment = require('./models/Apartment'); // Adjust the path based on your project structure

const startApartmentConsumer = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'apartment_queue';

    await channel.assertQueue(queue, { durable: false });

    console.log(`[*] Apartment Consumer waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(queue, async (message) => {
      const newApartment = JSON.parse(message.content.toString());
      
      // Save the new apartment to the local database
      await Apartment.create(newApartment);

      console.log('Received new apartment:', newApartment);
    }, { noAck: true });
  } catch (error) {
    console.error('Error starting Apartment Consumer', error);
  }
};

startApartmentConsumer();
