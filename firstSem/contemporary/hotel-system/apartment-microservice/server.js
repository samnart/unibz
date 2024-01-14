// // apartment-microservice/server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const amqp = require('amqplib');
// const apartmentRoutes = require('./routes/apartmentRoutes');
// const getDatabaseConfig = require('./config/database');

// const app = express();
// app.use(express.json());

// const { rabbitmqConfig, database, options } = getDatabaseConfig('apartment_microservice');

// // Connect to MongoDB
// mongoose.connect(database, options);

// // Connect to RabbitMQ
// const startMicroservice = async () => {
//   try {
//     console.log('Connecting to RabbitMQ...');

//     const connection = await amqp.connect(rabbitmqConfig.url);
//     console.log('Connected to RabbitMQ!');

//     const channel = await connection.createChannel();
//     const queue = rabbitmqConfig.queueName;

//     // Assert the queue
//     await channel.assertQueue(queue, { durable: false });

//     // Use the channel in your routes
//     app.use('/api', apartmentRoutes(channel));

//     const port = process.env.PORT || 3002;
//     app.listen(port, () => {
//       console.log(`Apartment Microservice is running on port ${port}`);
//     });
//   } catch (error) {
//     console.error('Error starting Apartment Microservice', error);
//   }
// };

// startMicroservice();


const express = require('express');
const mongoose = require('mongoose');
const apartmentRoutes = require('./routes/apartmentRoutes');
const getDatabaseConfig = require('./config/database');
const amqp = require('amqplib');

// Function to start the microservice
const startMicroservice = async () => {
  // Retrieve configuration from database.js
  const { database, options } = getDatabaseConfig('apartment_microservice');

  // Connect to MongoDB
  mongoose.connect(database, options);

  // Connect to RabbitMQ server
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  // Define a queue name for apartment messages
  const queueName = 'apartment_queue';

  // Function to consume messages from the RabbitMQ queue (consumer)
  const consumeApartmentMessages = async () => {
    await channel.consume(queueName, (msg) => {
      const apartment = JSON.parse(msg.content.toString());
      console.log('Received apartment:', apartment);
      // Perform actions with the received apartment information as needed
    }, { noAck: true });
  };

  // Start consuming messages
  consumeApartmentMessages();

  // Create Express app
  const app = express();
  const port = process.env.PORT || 3002;

  app.use(express.json());
  app.use('/api', apartmentRoutes);

  app.listen(port, () => {
    console.log(`Apartment Microservice is running on port ${port}`);
  });
};

// Call the function to start the microservice
startMicroservice();
