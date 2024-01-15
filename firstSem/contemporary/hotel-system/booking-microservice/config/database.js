const mongoose = require('mongoose');

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


const getDatabaseConfig = (microserviceName) => {
  return {
    database: `mongodb://mongo-db:27017/${microserviceName}_db`, // Assuming you have a MongoDB service named 'mongo-db'
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  };
};

module.exports = getDatabaseConfig;
