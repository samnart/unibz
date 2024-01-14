// // // booking-microservice/config/database.js

// // const mongoose = require('mongoose');

// // const getDatabaseConfig = (microserviceName) => {
// //   return {
// //     database: `mongodb://localhost:27017/${microserviceName}_db`,
// //     options: {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     },
// //   };
// // };

// // module.exports = getDatabaseConfig;

// const mongoose = require('mongoose');

// const getDatabaseConfig = (microserviceName) => {
//   const databaseUrl = `mongodb://localhost:27017/${microserviceName}_db`;

//   return {
//     url: databaseUrl, // Include the 'url' property
//     database: databaseUrl,
//     options: {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//   };
// };

// module.exports = getDatabaseConfig;


// No changes needed in the database configuration for RabbitMQ
const mongoose = require('mongoose');

const getDatabaseConfig = (microserviceName) => {
  return {
    database: `mongodb://localhost:27017/${microserviceName}_db`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };
};

module.exports = getDatabaseConfig;
