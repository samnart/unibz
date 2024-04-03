// // search-microservice/config/database.js

// const mongoose = require('mongoose');

// const getDatabaseConfig = (microserviceName) => {
//   return {
//     database: `mongodb://localhost:27017/${microserviceName}_db`,
//     options: {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//   };
// };

// module.exports = getDatabaseConfig;

// search-microservice/config/database.js
const mongoose = require("mongoose");

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
