// // search-microservice/routes/searchRoutes.js

// const express = require('express');
// const router = express.Router();
// const searchController = require('../controllers/searchController');

// module.exports = (channel) => {
//   // GET request to initiate search
//   router.get('/search', async (req, res) => {
//     try {
//       console.log('Executing searchHandler');

//       // Send a message to RabbitMQ to trigger the search
//       channel.sendToQueue('search_queue', Buffer.from(JSON.stringify({ action: 'search' })));

//       res.json({ message: 'Search initiated' });
//     } catch (error) {
//       console.error('Error initiating search:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

//   return router;
// };

// search-microservice/routes/searchRoutes.js

// const express = require('express');
// const router = express.Router();
// const searchController = require('../controllers/searchController');

// router.get('/search', searchController.searchHandler);

// module.exports = router;


const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const amqp = require('amqplib');

const startSearchConsumer = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
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
          const accommodations = await searchController.getAccommodationsWithDetails();
          console.log('Accommodations from Apartment Microservice:', accommodations);

          // You can perform additional actions with the accommodations data here
        } catch (error) {
          console.error('Error getting accommodations from Apartment Microservice:', error.message);
          // Log the error and continue processing or return a default response
        }
      }
    }, { noAck: true });
  } catch (error) {
    console.error('Error starting Search Consumer', error);
    // Log the error and continue processing or exit gracefully
  }
};

// Start the search consumer when the module is loaded
startSearchConsumer();

router.get('/search', searchController.searchHandler);

module.exports = router;
