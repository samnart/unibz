// search-microservice/server.js

const express = require('express');
const mongoose = require('mongoose');
const searchRoutes = require('./routes/searchRoutes');
const getDatabaseConfig = require('./config/database');
const amqp = require('amqplib');

const { rabbitmqConfig } = require('./config/database');

// const cors = require('cors');

const app = express();
// const port = 30001;
app.use(cors());

const searchMicroserviceDbConfig = getDatabaseConfig('search_microservice');
mongoose.connect(searchMicroserviceDbConfig.database, searchMicroserviceDbConfig.options);

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
    app.use('/api', searchRoutes(channel));

    const port = process.env.PORT || 3001;
    app.listen(port, () => {
      console.log(`Search Microservice is running on port ${port}`);
    });
  } catch (error) {
    console.log('Error starting Search Microservice', error);
  }
};

startMicroservice();





// app.use('/api', searchRoutes);

// const port = process.env.PORT || 3001;
// app.listen(port, () => {
//   console.log(`Search Microservice is running on port ${port}`);
// });
