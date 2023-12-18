// server.js

const express = require('express');
const mongoose = require('mongoose');
const searchRoutes = require('./routes/searchRoutes');
const apartmentRoutes = require('./routes/apartmentRoutes');
const databaseConfig = require('./config/database');

const app = express();

// connect to the database
// mongoose.Promise = global.Promise;
// mongoose.connect(databaseConfig.database, { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true, 
// });

mongoose.Promise = global.Promise;
mongoose.connect(databaseConfig.database, databaseConfig.options);

// Setup middleware and routes
app.use(express.json());
app.use('/api', searchRoutes);
app.use('/api', apartmentRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

