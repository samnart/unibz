// apartment-microservice/server.js

const express = require('express');
const mongoose = require('mongoose');
const apartmentRoutes = require('./routes/apartmentRoutes');
const getDatabaseConfig = require('./config/database');

const app = express();

const apartmentMicroserviceDbConfig = getDatabaseConfig('apartment_microservice');
mongoose.connect(apartmentMicroserviceDbConfig.database, apartmentMicroserviceDbConfig.options);

app.use(express.json());
app.use('/api', apartmentRoutes);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Apartment Microservice is running on port ${port}`);
});

