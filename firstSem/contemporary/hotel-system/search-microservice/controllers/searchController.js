// // search-microservice/controllers/searchController.js

// const Accommodation = require('../models/Accommodation');

// const searchHandler = async (req, res) => {
//   try {
//     const accommodations = await Accommodation.find({ availability: true });
//     res.json({ accommodations });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = { searchHandler };

const axios = require('axios');

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

const searchHandler = async (req, res) => {
  try {
    console.log('Executing searchHandler');

    const accommodations = await getAccommodationsWithDetails();
    console.log('Accommodations from Apartment Microservice:', accommodations);
    // Process and return search results
    res.json({ accommodations });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { searchHandler };

