// search-microservice/consumers/search-consumer.js

const amqp = require('amqplib');
const axios = require('axios');

const startSearchConsumer = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'search_queue';

    await channel.assertQueue(queue, { durable: false });

    console.log(`[*] Search Consumer waiting for messages in ${queue}. To exit press CTRL+C`);

    channel.consume(queue, async (message) => {
      const action = JSON.parse(message.content.toString()).action;
      
      if (action === 'search') {
        // Perform search-related actions here
        console.log('Received search action');
      }
    }, { noAck: true });
  } catch (error) {
    console.error('Error starting Search Consumer', error);
  }
};

startSearchConsumer();
