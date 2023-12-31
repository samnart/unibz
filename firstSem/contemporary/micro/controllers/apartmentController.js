// controllers/apartmentController.js

const Apartment = require('../models/Apartment');

const getApartments = async (req, res) => {
    try {
        // retrieve apartments from the database
        const apartments = await Apartment.find();
        res.json({ apartments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getApartments };