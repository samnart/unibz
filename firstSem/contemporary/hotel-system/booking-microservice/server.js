// // // booking-microservice/server.js

// // const express = require('express');
// // const mongoose = require('mongoose');
// // const bookingRoutes = require('./routes/bookingRoutes');
// // const getDatabaseConfig = require('./config/database');
// // const amqp = require('amqplib');

// // const { rabbitmqConfig } = require('./config/database');

// // const app = express();

// // const bookingMicroserviceDbConfig = getDatabaseConfig('booking_microservice');
// // mongoose.connect(bookingMicroserviceDbConfig.database, bookingMicroserviceDbConfig.options);

// // app.use(express.json());

// // // Connect to RabbitMQ
// // const startMicroservice = async () => {
// //   try {
// //     const connection = await amqp.connect(rabbitmqConfig.url);
// //     const channel = await connection.createChannel();
// //     const queue = rabbitmqConfig.queueName;

// //     // Assert the queue
// //     await channel.assertQueue(queue, { durable: false });

// //     // Use the channel in the routes
// //     app.use('/api', bookingRoutes(channel));

// //     const port = process.env.PORT || 3003;
// //     app.listen(port, () => {
// //       console.log(`Booking Microservice is running on port ${port}`);
// //     });
// //   } catch (error) {
// //     console.log('Error starting Booking Microservice', error);
// //   }
// // };

// // startMicroservice();




// // const express = require('express');
// // const mongoose = require('mongoose');
// // const bookingRoutes = require('./routes/bookingRoutes');
// // const getDatabaseConfig = require('./config/database');

// // // Function to start the microservice
// // const startMicroservice = () => {
// //   // Retrieve configuration from database.js
// //   const { database, options } = getDatabaseConfig('booking_microservice');

// //   // Connect to MongoDB
// //   mongoose.connect(database, options);

// //   // Create Express app
// //   const app = express();
// //   const port = process.env.PORT || 3003;

// //   app.use(express.json());
// //   app.use('/api', bookingRoutes);

// //   app.listen(port, () => {
// //     console.log(`Booking Microservice is running on port ${port}`);
// //   });
// // };

// // // Call the function to start the microservice
// // startMicroservice();


// const express = require('express');
// const mongoose = require('mongoose');
// const bookingRoutes = require('./routes/bookingRoutes');
// const getDatabaseConfig = require('./config/database');

// // Import amqp library
// const amqp = require('amqplib');

// // Function to start the microservice
// const startMicroservice = async () => {
//   // Retrieve configuration from database.js
//   const { database, options } = getDatabaseConfig('booking_microservice');

//   // Connect to MongoDB
//   mongoose.connect(database, options);

//   // Connect to RabbitMQ server
//   const connection = await amqp.connect('amqp://localhost');
//   const channel = await connection.createChannel();

//   // Define a queue name for booking messages
//   const queueName = 'booking_queue';

//   // Ensure the queue exists (consumer)
//   await channel.assertQueue(queueName, { durable: false });

//   // Consume messages from the queue (consumer)
//   channel.consume(queueName, (msg) => {
//     const booking = JSON.parse(msg.content.toString());
//     // Process the received booking
//     console.log('Received booking:', booking);
//     // Acknowledge the message
//     channel.ack(msg);
//   });

//   // Create Express app
//   const app = express();
//   const port = process.env.PORT || 3003;

//   app.use(express.json());
//   app.use('/api', bookingRoutes);

//   app.listen(port, () => {
//     console.log(`Booking Microservice is running on port ${port}`);
//   });
// };

// // Call the function to start the microservice
// startMicroservice();


const express = require('express');
const mongoose = require('mongoose');
const bookingRoutes = require('./routes/bookingRoutes');
const getDatabaseConfig = require('./config/database');
const amqp = require('amqplib');

// Function to start the microservice
const startMicroservice = async () => {
  // Retrieve configuration from database.js
  const { database, options } = getDatabaseConfig('booking_microservice');

  // Connect to MongoDB
  mongoose.connect(database, options);

  // Connect to RabbitMQ server
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  // Define a queue name for booking messages
  const queueName = 'booking_queue';

  // Function to consume messages from the RabbitMQ queue (consumer)
  const consumeBookingMessages = async () => {
    await channel.consume(queueName, (msg) => {
      const booking = JSON.parse(msg.content.toString());
      console.log('Received booking:', booking);
      // Perform actions with the received booking information as needed
    }, { noAck: true });
  };

  // Start consuming messages
  consumeBookingMessages();

  // Create Express app
  const app = express();
  const port = process.env.PORT || 3003;

  app.use(express.json());
  app.use('/api', bookingRoutes);

  app.listen(port, () => {
    console.log(`Booking Microservice is running on port ${port}`);
  });
};

// Call the function to start the microservice
startMicroservice();
