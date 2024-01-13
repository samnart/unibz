// search-microservice/routes/searchRoutes.js

const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

module.exports = (channel) => {
    router.get('/search', async (req, res) => {
        try {
            console.log('Executing searchHandler');

            // Send a message to RabbitMQ to trigger the search
            channel.sendToQueue('search_queue', Buffer.from(JSON.stringify({ action: 'search' })));

            res.json({ message: 'Search initiated' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    return router;
}

router.get('/search', searchController.searchHandler);

module.exports = router;
