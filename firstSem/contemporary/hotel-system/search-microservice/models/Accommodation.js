// // search-microservice/models/Accommodation.js

// const mongoose = require('mongoose');

// const accommodationSchema = new mongoose.Schema({
//   name: String,
//   location: String,
//   availability: Boolean,
// });

// module.exports = mongoose.model('Accommodation', accommodationSchema);

// search-microservice/models/Accommodation.js
const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
  name: String,
  location: String,
  availability: Boolean,
});

module.exports = mongoose.model("Accommodation", accommodationSchema);
