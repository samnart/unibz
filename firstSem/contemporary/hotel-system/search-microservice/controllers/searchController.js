// // search-microservice/controllers/searchController.js

// const amqp = require('amqplib');
// const axios = require('axios');

// const getAccommodationsWithDetails = async () => {
//   try {
//     // Make a request to the Apartment Microservice to get detailed information about accommodations
//     const response = await axios.get('http://localhost:3002/api/apartments');
//     return response.data;
//   } catch (error) {
//     console.error('Error communicating with Apartment Microservice', error.message);
//     throw error;
//   }
// };

// const searchHandler = async (req, res) => {
//   try {
//     console.log('Executing searchHandler');

//     // Connect to RabbitMQ server
//     const connection = await amqp.connect('amqp://localhost');
//     const channel = await connection.createChannel();

//     // Define a queue name for apartment messages
//     const queueName = 'apartment_queue';

//     // Function to consume messages from the RabbitMQ queue (consumer)
//     const consumeApartmentMessages = async () => {
//       try {
//         await channel.consume(queueName, (msg) => {
//           const apartment = JSON.parse(msg.content.toString());
//           console.log('Received apartment:', apartment);
//           // Perform actions with the received apartment information as needed
//         }, { noAck: true });
//       } catch (error) {
//         console.error('Error consuming Apartment messages:', error);
//       }
//     };

//     // Start consuming messages
//     consumeApartmentMessages();

//     // Get detailed information about accommodations
//     const accommodations = await getAccommodationsWithDetails();
//     console.log('Accommodations from Apartment Microservice:', accommodations);

//     // Process and return search results
//     res.json({ accommodations });

//     // Close the RabbitMQ connection
//     await connection.close();
//   } catch (error) {
//     // Handle errors
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = { searchHandler };

// search-microservice/controllers/searchController.js
const amqp = require('amqplib');
const axios = require('axios');

const searchHandler = async (req, res) => {
  try {
    console.log('Executing searchHandler');

    const accommodations = await getAccommodationsWithDetails();
    console.log('Accommodations from Apartment Microservice:', accommodations);

    res.json({ accommodations });
  } catch (error) {
    console.error('Error processing search request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAccommodationsWithDetails = async () => {
  try {
    const response = await axios.get('http://localhost:3002/api/apartments');
    return response.data;
  } catch (error) {
    console.error('Error communicating with Apartment Microservice', error.message);
    throw error;
  }
};

module.exports = { searchHandler, getAccommodationsWithDetails };
