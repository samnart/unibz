const express = require('express');
const router = express.Router();
const apartmentController = require('../controllers/apartmentController');

const Apartment = require('../models/Apartment');


module.exports = (channel) => {
    // GET request to retrieve apartments
    router.get('/apartments', apartmentController.getApartments);

    // POST request to add a new apartment
    router.post('/apartments', async (req, res) => {
        try {
            const { name, location, price } = req.body;

            // Create a new apartment instance
            const newApartment = new Apartment({
                name,
                location,
                price,
            });

            // Save the apartment to the database
            // await newApartment.save();
            channel.sendToQueue('apartment_queue', Buffer.from(JSON.stringify(newApartment)));

            res.status(201).json({ message: 'Apartment added successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    return router;

};


// module.exports = router;
