// apartment-microservice/consumers/apartment-consumer.js

const amqp = require("amqplib");
const mongoose = require("mongoose");
const Apartment = require("../models/Apartment");

const startApartmentConsumer = async () => {
  try {
    // const connection = await amqp.connect('amqp://localhost');
    const connection = await amqp.connect("amqp://rabbitmq");

    const channel = await connection.createChannel();
    const queue = "apartment_queue";

    await channel.assertQueue(queue, { durable: false });

    console.log(
      `[*] Apartment Consumer waiting for messages in ${queue}. To exit press CTRL+C`,
    );

    channel.consume(
      queue,
      async (message) => {
        try {
          const newApartment = JSON.parse(message.content.toString());

          // Save the new apartment to the local database
          await Apartment.create(newApartment);

          console.log("Received new apartment:", newApartment);
        } catch (error) {
          console.error("Error processing apartment message:", error);
        }
      },
      { noAck: true },
    );
  } catch (error) {
    console.error("Error starting Apartment Consumer", error);
  }
};

startApartmentConsumer();
