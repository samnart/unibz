// // apartment-microservice/controllers/apartmentController.js

// const axios = require('axios');
// const amqp = require('amqplib');
// const express = require('express');
// const router = express.Router();
// const Apartment = require('../models/Apartment');

// const getApartmentsWithBookings = async () => {
//   try {
//     const response = await axios.get('http://booking-service:3003/api/bookings');
//     return response.data;
//   } catch (error) {
//     if (error.code === 'ECONNREFUSED') {
//       console.error('Error: Unable to connect to Booking Microservice. Ensure it is running.');
//     } else {
//       console.error('Error communicating with Booking Microservice', error.message);
//     }
//     return { bookings: [] }; // Return an empty array to handle the lack of bookings
//   }
// };

// const createApartment = async (req, res) => {
//   try {
//     const { name, location, price } = req.body;

//     const newApartment = new Apartment({
//       name,
//       location,
//       price,
//     });

//     // Save the apartment to the local database
//     await newApartment.save();

//     // Connect to RabbitMQ server
//     const connection = await amqp.connect('amqp://localhost');
//     const channel = await connection.createChannel();

//     // Define a queue name for apartment messages
//     const queueName = 'apartment_queue';

//     // Send the apartment details to RabbitMQ queue (producer)
//     channel.assertQueue(queueName, { durable: false });
//     channel.sendToQueue(queueName, Buffer.from(JSON.stringify(newApartment)));

//     // Close the RabbitMQ connection
//     await connection.close();

//     res.status(201).json({ message: 'Apartment added successfully' });
//   } catch (error) {
//     console.error('Error creating apartment:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// const getApartments = async (req, res) => {
//   try {
//     const localApartments = await Apartment.find();
//     const bookingsResponse = await getApartmentsWithBookings();
//     const bookings = bookingsResponse.bookings || [];

//     console.log('Local Apartments:', localApartments);
//     console.log('Bookings:', bookings);

//     const apartmentsWithBookings = localApartments.map((apartment) => {
//       const booking = bookings.find((booking) => booking.accommodationId.toString() === apartment._id.toString());
//       return {
//         ...apartment.toObject(),
//         booking: booking || null,
//       };
//     });

//     res.json({ apartmentsWithBookings });
//   } catch (error) {
//     console.error('Error getting apartments:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// module.exports = { createApartment, getApartments };

// apartment-microservice/controllers/apartmentController.js

const axios = require("axios");
const amqp = require("amqplib");
const express = require("express");
const router = express.Router();
const Apartment = require("../models/Apartment");

const getApartmentsWithBookings = async () => {
  try {
    const response = await axios.get(
      "http://booking-microservice:3003/api/bookings",
    );
    return response.data;
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      console.error(
        "Error: Unable to connect to Booking Microservice. Ensure it is running.",
      );
    } else {
      console.error(
        "Error communicating with Booking Microservice",
        error.message,
      );
    }
    return { bookings: [] };
  }
};

const createApartment = async (req, res) => {
  try {
    const { name, location, price } = req.body;

    const newApartment = new Apartment({
      name,
      location,
      price,
    });

    // Save the apartment to the local database
    await newApartment.save();

    // Connect to RabbitMQ server
    const connection = await amqp.connect("amqp://rabbitmq");
    const channel = await connection.createChannel();

    // Define a queue name for apartment messages
    const queueName = "apartment_queue";

    // Send the apartment details to RabbitMQ queue (producer)
    channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(newApartment)));

    // Close the RabbitMQ connection
    await connection.close();

    res.status(201).json({ message: "Apartment added successfully" });
  } catch (error) {
    console.error("Error creating apartment:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getApartments = async (req, res) => {
  try {
    const localApartments = await Apartment.find();
    const bookingsResponse = await getApartmentsWithBookings();
    const bookings = bookingsResponse.bookings || [];

    console.log("Local Apartments:", localApartments);
    console.log("Bookings:", bookings);

    const apartmentsWithBookings = localApartments.map((apartment) => {
      const booking = bookings.find(
        (booking) =>
          booking.accommodationId.toString() === apartment._id.toString(),
      );
      return {
        ...apartment.toObject(),
        booking: booking || null,
      };
    });

    res.json({ apartmentsWithBookings });
  } catch (error) {
    console.error("Error getting apartments:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createApartment, getApartments };
