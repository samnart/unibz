// // // search-microservice/server.js

// // const express = require('express');
// // const mongoose = require('mongoose');
// // const searchRoutes = require('./routes/searchRoutes');
// // const getDatabaseConfig = require('./config/database');
// // const amqp = require('amqplib');

// // const { rabbitmqConfig } = require('./config/database');

// // // const cors = require('cors');

// // const app = express();
// // // const port = 30001;
// // app.use(cors());

// // const searchMicroserviceDbConfig = getDatabaseConfig('search_microservice');
// // mongoose.connect(searchMicroserviceDbConfig.database, searchMicroserviceDbConfig.options);

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
// //     app.use('/api', searchRoutes(channel));

// //     const port = process.env.PORT || 3001;
// //     app.listen(port, () => {
// //       console.log(`Search Microservice is running on port ${port}`);
// //     });
// //   } catch (error) {
// //     console.log('Error starting Search Microservice', error);
// //   }
// // };

// // startMicroservice();



// const express = require('express');
// const mongoose = require('mongoose');
// const searchRoutes = require('./routes/searchRoutes');
// const getDatabaseConfig = require('./config/database');
// const amqp = require('amqplib');

// // Function to start the microservice
// const startMicroservice = async () => {
//   // Retrieve configuration from database.js
//   const { database, options } = getDatabaseConfig('search_microservice');

//   // Connect to MongoDB
//   mongoose.connect(database, options);

//   // Connect to RabbitMQ server
//   const connection = await amqp.connect('amqp://localhost');
//   const channel = await connection.createChannel();

//   // Define a queue name for apartment messages
//   const queueName = 'apartment_queue';

//   // Function to consume messages from the RabbitMQ queue (consumer)
//   const consumeApartmentMessages = async () => {
//     await channel.consume(queueName, (msg) => {
//       const apartment = JSON.parse(msg.content.toString());
//       console.log('Received apartment:', apartment);
//       // Perform actions with the received apartment information as needed
//     }, { noAck: true });
//   };

//   // Start consuming messages
//   consumeApartmentMessages();

//   // Create Express app
//   const app = express();
//   const port = process.env.PORT || 3001;

//   app.use(express.json());
//   app.use('/api', searchRoutes);

//   app.listen(port, () => {
//     console.log(`Search Microservice is running on port ${port}`);
//   });
// };

// // Call the function to start the microservice
// startMicroservice();


const express = require('express');
const mongoose = require('mongoose');
const searchRoutes = require('./routes/searchRoutes');
const getDatabaseConfig = require('./config/database');
const amqp = require('amqplib');

// Function to start the microservice
const startMicroservice = async () => {
  // Retrieve configuration from database.js
  const { database, options } = getDatabaseConfig('search_microservice');

  // Connect to MongoDB
  mongoose.connect(database, options);

  // Create Express app
  const app = express();
  const port = process.env.PORT || 3001;

  app.use(express.json());
  app.use('/api', searchRoutes);

  app.listen(port, () => {
    console.log(`Search Microservice is running on port ${port}`);
  });
};

// Call the function to start the microservice
startMicroservice();

