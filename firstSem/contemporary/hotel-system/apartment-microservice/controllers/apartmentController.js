// // apartment-microservice/controllers/apartmentController.js

// const Apartment = require('../models/Apartment');

// const getApartments = async (req, res) => {
//   try {
//     const apartments = await Apartment.find();
//     res.json({ apartments });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = { getApartments };

const axios = require('axios');
const Apartment = require('../models/Apartment');

const getApartmentsWithBookings = async () => {
  try {
    // Make a request to the Booking Microservice to get information about bookings
    const response = await axios.get('http://localhost:3003/api/bookings');
    return response.data;
  } catch (error) {
    console.error('Error communicating with Booking Microservice', error.message);
    throw error;
  }
};

const getApartments = async (req, res) => {
  try {
    // Get apartments from the local database
    const localApartments = await Apartment.find();

    // Get bookings from the Booking Microservice
    const bookingsResponse = await getApartmentsWithBookings();
    const bookings = bookingsResponse.bookings;

    console.log('Local Apartments:', localApartments);
    console.log('Bookings:', bookings);

    // Combine local apartments with booking information
    const apartmentsWithBookings = localApartments.map((apartment) => {
      const booking = bookings.find((booking) => booking.accommodationId.toString() === apartment._id.toString());
      return {
        ...apartment.toObject(),
        booking: booking || null,
      };
    });

    res.json({ apartmentsWithBookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getApartments };
