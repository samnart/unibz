const amqp = require("amqplib");
const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const { accommodationId, startDate, endDate } = req.body;

    // Save the booking to the local database
    const booking = await Booking.create({
      accommodationId,
      startDate,
      endDate,
    });

    // Connect to RabbitMQ server
    const connection = await amqp.connect("amqp://rabbitmq");
    const channel = await connection.createChannel();

    // Define a queue name for booking messages
    const queueName = "booking_queue";

    // Send the booking details to RabbitMQ queue (producer)
    channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(booking)));

    // Close the RabbitMQ connection
    await connection.close();

    res.status(201).json({ booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    // Delete the booking from the local database
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBookings = async (req, res) => {
  try {
    // Retrieve bookings from the local database
    const bookings = await Booking.find();
    res.json({ bookings });
  } catch (error) {
    console.error("Error getting bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createBooking, deleteBooking, getBookings };
