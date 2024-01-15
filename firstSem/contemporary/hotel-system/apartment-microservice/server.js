// // apartment-microservice/server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const apartmentRoutes = require('./routes/apartmentRoutes');
// const getDatabaseConfig = require('./config/database');
// const amqp = require('amqplib');

// const startMicroservice = async () => {
//   try {
//     const { database, options } = getDatabaseConfig('apartment_microservice');

//     // Connect to MongoDB
//     await mongoose.connect(database, options);
//     console.log('Connected to MongoDB');

//     // Connect to RabbitMQ server
//     const connection = await amqp.connect('amqp://localhost');
//     const channel = await connection.createChannel();

//     // Define a queue name for apartment messages
//     const queueName = 'apartment_queue';

//     await channel.assertQueue(queueName, { durable: false });

//     // Function to consume messages from the RabbitMQ queue (consumer)
//     const consumeApartmentMessages = async () => {
//       await channel.consume(queueName, (msg) => {
//         try {
//           const apartment = JSON.parse(msg.content.toString());
//           console.log('Received apartment:', apartment);
//           // Perform actions with the received apartment information as needed
//         } catch (error) {
//           console.error('Error processing apartment message:', error);
//         }
//       }, { noAck: true });
//     };

//     // Start consuming messages
//     consumeApartmentMessages();

//     // Create Express app
//     const app = express();
//     const port = process.env.PORT || 3002;

//     app.use(express.json());
//     app.use('/api', apartmentRoutes(channel));

//     app.listen(port, () => {
//       console.log(`Apartment Microservice is running on port ${port}`);
//     });
//   } catch (error) {
//     console.error('Error starting Apartment Microservice:', error);
//     process.exit(1); // Exit the process if there is an error
//   }
// };

// // Call the function to start the microservice
// startMicroservice();


// apartment-microservice/server.js

const express = require('express');
const mongoose = require('mongoose');
const apartmentRoutes = require('./routes/apartmentRoutes');
const getDatabaseConfig = require('./config/database');
const amqp = require('amqplib');

const startMicroservice = async () => {
  try {
    const { database, options, rabbitmqConfig } = getDatabaseConfig('apartment_microservice');

    // Connect to MongoDB
    await mongoose.connect(database, options);
    console.log('Connected to MongoDB');

    // Connect to RabbitMQ server
    const connection = await amqp.connect(rabbitmqConfig.url);
    const channel = await connection.createChannel();

    // Define a queue name for apartment messages
    const queueName = rabbitmqConfig.queueName;

    await channel.assertQueue(queueName, { durable: false });

    // Function to consume messages from the RabbitMQ queue (consumer)
    const consumeApartmentMessages = async () => {
      await channel.consume(queueName, (msg) => {
        try {
          const apartment = JSON.parse(msg.content.toString());
          console.log('Received apartment:', apartment);
          // Perform actions with the received apartment information as needed
        } catch (error) {
          console.error('Error processing apartment message:', error);
        }
      }, { noAck: true });
    };

    // Start consuming messages
    consumeApartmentMessages();

    // Create Express app
    const app = express();
    const port = process.env.PORT || 3002;

    app.use(express.json());
    app.use('/api', apartmentRoutes(channel));

    app.listen(port, () => {
      console.log(`Apartment Microservice is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting Apartment Microservice:', error);
    process.exit(1); // Exit the process if there is an error
  }
};

// Call the function to start
startMicroservice();