// const axios = require('axios');
// const Apartment = require('../models/Apartment');

// const getApartmentsWithBookings = async () => {
//   try {
//     // Make a request to the Booking Microservice to get information about bookings
//     const response = await axios.get('http://localhost:3003/api/bookings');
//     return response.data;
//   } catch (error) {
//     console.error('Error communicating with Booking Microservice', error.message);
//     // Return a fallback response when there's an error (for example, an empty array)
//     return { bookings: [] };
//   }
// };

// const getApartments = async (req, res) => {
//   try {
//     // Get apartments from the local database
//     const localApartments = await Apartment.find();

//     // Get bookings from the Booking Microservice with error handling and fallback
//     const bookingsResponse = await getApartmentsWithBookings();
//     const bookings = bookingsResponse.bookings;

//     console.log('Local Apartments:', localApartments);
//     console.log('Bookings:', bookings);

//     // Combine local apartments with booking information
//     const apartmentsWithBookings = localApartments.map((apartment) => {
//       const booking = bookings.find((booking) => booking.accommodationId.toString() === apartment._id.toString());
//       return {
//         ...apartment.toObject(),
//         booking: booking || null,
//       };
//     });

//     res.json({ apartmentsWithBookings });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = { getApartments };


const axios = require('axios');
const amqp = require('amqplib');
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

const createApartment = async (req, res) => {
  try {
    const { name, location, price } = req.body;

    // Create a new apartment instance
    const newApartment = new Apartment({
      name,
      location,
      price,
    });

    // Save the apartment to the local database
    await newApartment.save();

    // Connect to RabbitMQ server
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Define a queue name for apartment messages
    const queueName = 'apartment_queue';

    // Send the apartment details to RabbitMQ queue (producer)
    channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(newApartment)));

    // Close the RabbitMQ connection
    await connection.close();

    res.status(201).json({ message: 'Apartment added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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

module.exports = { createApartment, getApartments };
