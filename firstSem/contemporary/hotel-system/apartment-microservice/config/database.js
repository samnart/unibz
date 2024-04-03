// apartment-microservice/config/database.js

const getDatabaseConfig = (microserviceName) => {
  return {
    rabbitmqConfig: {
      url: "amqp://localhost",
      queueName: "apartment_queue",
    },
    database: `mongodb://localhost:27017/${microserviceName}_db`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };
};

module.exports = getDatabaseConfig;
