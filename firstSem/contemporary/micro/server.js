// In server.js
const express = require('express');
const searchRoutes = require('./routes/searchRoutes');
const apartmentRoutes = require('./routes/apartmentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const getDatabaseConfig = require('./config/database');
const connectToDatabase = require('./db'); // Import the new function

const app = express();

// Connect to the respective microservice databases
const searchMicroserviceDbConfig = getDatabaseConfig('search_microservice_db');
const searchMicroserviceDb = connectToDatabase(searchMicroserviceDbConfig.database);

const apartmentMicroserviceDbConfig = getDatabaseConfig('apartment_microservice_db');
const apartmentMicroserviceDb = connectToDatabase(apartmentMicroserviceDbConfig.database);

const bookingMicroserviceDbConfig = getDatabaseConfig('booking_microservice_db');
const bookingMicroserviceDb = connectToDatabase(bookingMicroserviceDbConfig.database);

// Setup middleware and routes
app.use(express.json());
app.use('/api', searchRoutes(searchMicroserviceDb)); // Pass the connection instance
app.use('/api', apartmentRoutes(apartmentMicroserviceDb)); // Pass the connection instance
app.use('/api', bookingRoutes(bookingMicroserviceDb)); // Pass the connection instance

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
