// server.js

const express = require('express');
const mongoose = require('mongoose');
const searchRoutes = require('./routes/searchRoutes');
const apartmentRoutes = require('./routes/apartmentRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const databaseConfig = require('./config/database');

const app = express();

// connect to the respective microservice databases

const searchMicroserviceDbConfig = { ...databaseConfig, database: `mongodb://localhost:27017/search_microservice_db` };
mongoose.connect(searchMicroserviceDbConfig.database, searchMicroserviceDbConfig.options);

const apartmentMicroserviceDbConfig = { ...databaseConfig, database: `mongodb://localhost:27017/search_microservice_db` };
mongoose.connect(apartmentMicroserviceDbConfig.database, apartmentMicroserviceDbConfig.options);

const bookingMicroserviceDbConfig = { ...databaseConfig, database: `mongodb://localhost:27017/search_microservice_db` };
mongoose.connect(bookingMicroserviceDbConfig.database, bookingMicroserviceDbConfig.options);

// connect to the database
// mongoose.Promise = global.Promise;
// mongoose.connect(databaseConfig.database, { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true, 
// });

// mongoose.Promise = global.Promise;
// mongoose.connect(databaseConfig.database, databaseConfig.options);

// Setup middleware and routes
app.use(express.json());
app.use('/api', searchRoutes);
app.use('/api', apartmentRoutes);
app.use('/api', bookingRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

