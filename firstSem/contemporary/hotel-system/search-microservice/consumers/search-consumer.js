// // // search-microservice/consumers/search-consumer.js

// const amqp = require('amqplib');
// const axios = require('axios');

// const startSearchConsumer = async () => {
//   try {
//     const connection = await amqp.connect('amqp://rabbitmq');

//     const channel = await connection.createChannel();
//     const queue = 'search_queue';

//     await channel.assertQueue(queue, { durable: false });

//     console.log(`[*] Search Consumer waiting for messages in ${queue}. To exit press CTRL+C`);

//     channel.consume(queue, async (message) => {
//       const action = JSON.parse(message.content.toString()).action;

//       if (action === 'search') {
//         console.log('Received search action');
//         try {
//           const accommodations = await getAccommodationsWithDetails();
//           console.log('Accommodations from Apartment Microservice:', accommodations);

//         } catch (error) {
//           console.error('Error getting accommodations from Apartment Microservice:', error.message);
//         }
//       }
//     }, { noAck: true });
//   } catch (error) {
//     console.error('Error starting Search Consumer', error);
//   }
// };

// const getAccommodationsWithDetails = async () => {
//   try {
//     const response = await axios.get('http://localhost:3002/api/apartments');
//     return response.data;
//   } catch (error) {
//     console.error('Error communicating with Apartment Microservice', error.message);
//     throw error;
//   }
// };

// startSearchConsumer();


// search-microservice/consumers/search-consumer.js
const amqp = require('amqplib');
const axios = require('axios');

const startSearchConsumer = async () => {
  try {
    const connection = await amqp.connect('amqp://rabbitmq');
    const channel = await connection.createChannel();
    const queue = 'search_queue';

    await channel.assertQueue(queue, { durable: false });

    console.log(`[*] Search Consumer waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(queue, handleSearchAction, { noAck: true });
  } catch (error) {
    console.error('Error starting Search Consumer', error);
  }
};

const handleSearchAction = async (message) => {
  const action = JSON.parse(message.content.toString()).action;

  if (action === 'search') {
    console.log('Received search action');
    try {
      const accommodations = await getAccommodationsWithDetails();
      console.log('Accommodations from Apartment Microservice:', accommodations);
    } catch (error) {
      console.error('Error getting accommodations from Apartment Microservice:', error.message);
    }
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

startSearchConsumer();
