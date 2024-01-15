// // search-microservice/consumers/search-consumer.js

// const amqp = require('amqplib');

// const connectToQueue = async (channel, queue, attempt = 1) => {
//   try {
//     await channel.assertQueue(queue, { durable: false });
//     console.log(`[*] Search Consumer waiting for messages in ${queue}. To exit press CTRL+C`);
//     return true;
//   } catch (error) {
//     console.error(`Error asserting queue (attempt ${attempt}):`, error);
//     return false;
//   }
// };

// const startSearchConsumer = async () => {
//   try {
//     const connection = await amqp.connect('amqp://localhost');
//     const channel = await connection.createChannel();
//     const queue = 'search_queue';

//     // Retry logic to wait for the queue to be created
//     let attempt = 1;
//     while (!(await connectToQueue(channel, queue, attempt))) {
//       // Retry after a delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       attempt++;
//     }

//     channel.consume(queue, async (message) => {
//       try {
//         const action = JSON.parse(message.content.toString()).action;

//         if (action === 'search') {
//           // Perform search-related actions here
//           console.log('Received search action');
//         }
//       } catch (error) {
//         console.error('Error processing search action:', error);
//       }
//     }, { noAck: true });
//   } catch (error) {
//     console.error('Error starting Search Consumer', error);
//     process.exit(1); // Exit the process if there is an error
//   }
// };

// startSearchConsumer();


const amqp = require('amqplib');
const axios = require('axios');

const startSearchConsumer = async () => {
  try {
    // const connection = await amqp.connect('amqp://localhost');
    const connection = await amqp.connect('amqp://rabbitmq');

    const channel = await connection.createChannel();
    const queue = 'search_queue';

    await channel.assertQueue(queue, { durable: false });

    console.log(`[*] Search Consumer waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(queue, async (message) => {
      const action = JSON.parse(message.content.toString()).action;

      if (action === 'search') {
        // Perform search-related actions here
        console.log('Received search action');
        try {
          // Get detailed information about accommodations
          const accommodations = await getAccommodationsWithDetails();
          console.log('Accommodations from Apartment Microservice:', accommodations);

          // Process and return search results
          // You can perform additional actions with the accommodations data here
        } catch (error) {
          console.error('Error getting accommodations from Apartment Microservice:', error.message);
        }
      }
    }, { noAck: true });
  } catch (error) {
    console.error('Error starting Search Consumer', error);
  }
};

const getAccommodationsWithDetails = async () => {
  try {
    // Make a request to the Apartment Microservice to get detailed information about accommodations
    const response = await axios.get('http://localhost:3002/api/apartments');
    return response.data;
  } catch (error) {
    console.error('Error communicating with Apartment Microservice', error.message);
    throw error;
  }
};

startSearchConsumer();
