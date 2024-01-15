// // search-microservice/server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const searchRoutes = require('./routes/searchRoutes');
// const getDatabaseConfig = require('./config/database');
// const amqp = require('amqplib');

// // Function to start the microservice
// const startMicroservice = async () => {
//   try {
//     // Retrieve configuration from database.js
//     const { database, options } = getDatabaseConfig('search_microservice');

//     // Connect to MongoDB
//     await mongoose.connect(database, options);

//     // Connect to RabbitMQ server
//     const connection = await amqp.connect('amqp://localhost');
//     const channel = await connection.createChannel();

//     // Define a queue name for search messages
//     const queueName = 'search_queue';

//     // Function to consume messages from the RabbitMQ queue (consumer)
//     const consumeSearchMessages = async () => {
//       try {
//         await channel.consume(queueName, (msg) => {
//           try {
//             const action = JSON.parse(msg.content.toString()).action;
            
//             if (action === 'search') {
//               // Perform search-related actions here
//               console.log('Received search action');
//             }
//           } catch (error) {
//             console.error('Error processing search action:', error);
//           }
//         }, { noAck: true });
//       } catch (error) {
//         console.error('Error consuming Search messages:', error);
//       }
//     };

//     // Start consuming messages
//     consumeSearchMessages();

//     // Create Express app
//     const app = express();
//     const port = process.env.PORT || 3001;

//     app.use(express.json());
//     app.use('/api', searchRoutes(channel));

//     app.listen(port, () => {
//       console.log(`Search Microservice is running on port ${port}`);
//     });
//   } catch (error) {
//     console.error('Error starting Search Microservice:', error);
//     process.exit(1); // Exit the process if there is an error
//   }
// };

// // Call the function to start the microservice
// startMicroservice();


// search-microservice/server.js

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
