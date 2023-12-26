const axios = require('axios');

const getAccommodationsWithDetails = async () => {
  try {
    // Make a request to the Apartment Microservice to get detailed information about accommodations
    const response = await axios.get('http://localhost:3002/api/apartments');
    return response.data;
  } catch (error) {
    console.error('Error communicating with Apartment Microservice', error);
    throw error;
  }
};

const searchHandler = async (req, res) => {
  try {
    const accommodations = await getAccommodationsWithDetails();
    res.json({ accommodations });
  } catch (error) {
    console.error('Error processing search', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { searchHandler };
