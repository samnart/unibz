// apartment-microservice/server.js

const express = require('express');
const mongoose = require('mongoose');
const apartmentRoutes = require('./routes/apartmentRoutes');
const getDatabaseConfig = require('./config/database');
const amqp = require('amqplib');

const { rabbitmqConfig } = require('./config/database')

const cors = require('cors');

const app = express();
app.use(cors());

const apartmentMicroserviceDbConfig = getDatabaseConfig('apartment_microservice');
mongoose.connect(apartmentMicroserviceDbConfig.database, apartmentMicroserviceDbConfig.options);

app.use(express.json());

// Connect to RabbitMQ
const startMicroservice = async () => {
  try {
    const connection = await amqp.connect(rabbitmqConfig.url);
    const channel = await connection.createChannel();
    const queue = rabbitmqConfig.queueName;

    // Assert the queue
    await channel.assertQueue(queue, { durable: false });

    // Use the channel in the routes
    app.use('/api', apartmentRoutes(channel));

    const port = process.env.PORT || 3002;
    app.listen(port, () => {
      console.log(`Apartment Microservice is running on port ${port}`);
    });
  } catch (error) {
    console.log('Error starting Apartment Microservice', error);
  }
}

startMicroservice();






// app.use('/api', apartmentRoutes);

// const port = process.env.PORT || 3002;
// app.listen(port, () => {
//   console.log(`Apartment Microservice is running on port ${port}`);
// });

