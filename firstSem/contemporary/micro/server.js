// // server.js

// const express = require('express');
// const mongoose = require('mongoose');
// const searchRoutes = require('./routes/searchRoutes');
// const apartmentRoutes = require('./routes/apartmentRoutes');
// const bookingRoutes = require('./routes/bookingRoutes');
// const databaseConfig = require('./config/database');

// const searchSchema = require('./models/Accomodation');
// const apartmentSchema = require('./models/Apartment');
// const bookingSchema = require('./models/Booking');

// const app = express();

// // Uncomment the following lines to define searchMicroserviceDbConfig
// const searchMicroserviceDbConfig = { ...databaseConfig, database: `mongodb://localhost:27017/search_microservice_db` };
// const apartmentMicroserviceDbConfig = { ...databaseConfig, database: `mongodb://localhost:27017/apartment_microservice_db` };
// const bookingMicroserviceDbConfig = { ...databaseConfig, database: `mongodb://localhost:27017/booking_microservice_db` };


// // connect to the respective microservice databases

// // Use mongoose.createConnection to create separate connections
// const searchConnection = mongoose.createConnection(searchMicroserviceDbConfig.database, searchMicroserviceDbConfig.options);
// const apartmentConnection = mongoose.createConnection(apartmentMicroserviceDbConfig.database, apartmentMicroserviceDbConfig.options);
// const bookingConnection = mongoose.createConnection(bookingMicroserviceDbConfig.database, bookingMicroserviceDbConfig.options);

// // Use the connections in your models or queries
// const SearchModel = searchConnection.model('Search', searchSchema);
// const ApartmentModel = apartmentConnection.model('Apartment', apartmentSchema);
// const BookingModel = bookingConnection.model('Booking', bookingSchema);


// app.use(express.json());
// app.use('/api', searchRoutes);
// app.use('/api', apartmentRoutes);
// app.use('/api', bookingRoutes);

// // Start the server
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });



// server.js

const express = require('express');
const mongoose = require('mongoose');
const searchRoutes = require('./routes/searchRoutes');
const apartmentRoutes = require('./routes/apartmentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const databaseConfig = require('./config/database');

const searchSchema = require('./models/Accomodation');  // Fixed the typo here
const apartmentSchema = require('./models/Apartment');
const bookingSchema = require('./models/Booking');

const app = express();

// Uncomment the following lines to define searchMicroserviceDbConfig
const searchMicroserviceDbConfig = { ...databaseConfig, database: `mongodb://localhost:27017/search_microservice_db` };
const apartmentMicroserviceDbConfig = { ...databaseConfig, database: `mongodb://localhost:27017/apartment_microservice_db` };
const bookingMicroserviceDbConfig = { ...databaseConfig, database: `mongodb://localhost:27017/booking_microservice_db` };

// connect to the respective microservice databases

// Use mongoose.createConnection to create separate connections
const searchConnection = mongoose.createConnection(searchMicroserviceDbConfig.database, searchMicroserviceDbConfig.options);
const apartmentConnection = mongoose.createConnection(apartmentMicroserviceDbConfig.database, apartmentMicroserviceDbConfig.options);
const bookingConnection = mongoose.createConnection(bookingMicroserviceDbConfig.database, bookingMicroserviceDbConfig.options);

// Use the connections in your models or queries
const SearchModel = searchConnection.model('Search', searchSchema);
const ApartmentModel = apartmentConnection.model('Apartment', apartmentSchema);
const BookingModel = bookingConnection.model('Booking', bookingSchema);

app.use(express.json());
app.use('/api', searchRoutes(SearchModel));    // Pass the SearchModel to the routes
app.use('/api', apartmentRoutes(ApartmentModel)); // Pass the ApartmentModel to the routes
app.use('/api', bookingRoutes(BookingModel));   // Pass the BookingModel to the routes

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

