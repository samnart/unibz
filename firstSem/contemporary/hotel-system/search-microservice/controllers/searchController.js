// search-microservice/controllers/searchController.js

const Accommodation = require('../models/Accommodation');

const searchHandler = async (req, res) => {
  try {
    const accommodations = await Accommodation.find({ availability: true });
    res.json({ accommodations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { searchHandler };
