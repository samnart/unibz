// // // search-microservice/server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const searchRoutes = require('./routes/searchRoutes');
// const getDatabaseConfig = require('./config/database');

// // Function to start the microservice
// const startMicroservice = async () => {
//   // Retrieve configuration from database.js
//   const { database, options } = getDatabaseConfig('search_microservice');

//   // Connect to MongoDB
//   mongoose.connect(database, options);

//   // Create Express app
//   const app = express();
//   const port = process.env.PORT || 3001;

//   app.use(express.json());
//   app.use('/api', searchRoutes);

//   app.listen(port, () => {
//     console.log(`Search Microservice is running on port ${port}`);
//   });
// };

// // Call the function to start the microservice
// startMicroservice();

// search-microservice/server.js
const express = require("express");
const mongoose = require("mongoose");
const searchRoutes = require("./routes/searchRoutes");
const getDatabaseConfig = require("./config/database");

const startMicroservice = async () => {
  try {
    const { database, options } = getDatabaseConfig("search_microservice");
    await mongoose.connect(database, options);

    const app = express();
    const port = process.env.PORT || 3001;

    app.use(express.json());
    app.use("/api", searchRoutes);

    app.listen(port, () => {
      console.log(`Search Microservice is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting Search Microservice:", error);
    process.exit(1);
  }
};

startMicroservice();
