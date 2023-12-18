// config/database.js

// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/search_microservice_db', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });



const mongoose = require('mongoose');

const databaseConfig = {
  database: 'mongodb://localhost:27017/search_microservice_db',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

module.exports = databaseConfig;