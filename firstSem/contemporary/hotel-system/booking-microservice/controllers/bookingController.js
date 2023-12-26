const axios = require('axios');

const checkApartmentAvailability = async (accommodationId) => {
  try {
    // Make a request to the Apartment Microservice to check accommodation availability
    const response = await axios.get(`http://localhost:3002/api/apartments/${accommodationId}`);
    return response.data;
  } catch (error) {
    console.error('Error communicating with Apartment Microservice', error);
    throw error;
  }
};

const createBooking = async (req, res) => {
  try {
    const { accommodationId, startDate, endDate } = req.body;

    // Check accommodation availability before creating a booking
    const availabilityInfo = await checkApartmentAvailability(accommodationId);

    if (availabilityInfo.available) {
      // If available, proceed to create the booking
      // Make a request to the Booking Microservice to create a booking
      const bookingResponse = await axios.post('http://localhost:3003/api/bookings', {
        accommodationId,
        startDate,
        endDate,
      });

      res.json({ booking: bookingResponse.data });
    } else {
      res.status(400).json({ error: 'Accommodation is not available for booking' });
    }
  } catch (error) {
    console.error('Error creating booking', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createBooking };
