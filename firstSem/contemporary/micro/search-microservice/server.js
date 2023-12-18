// server.js

const express = require('express');
const mongoose = require('mongoose');
const searchRoutes = require('./routes/searchRoutes');
const databaseConfig = require('./config/database');

const app = express();

// connect to the database
mongoose.Promise = global.Promise;
mongoose.connect(databaseConfig.database, { useNewUrlParser: true, useUnifiedTopology: true });

// Setup middleware and routes
app.use(express.json());
app.use('/api', searchRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on port ${port}');
});