// search-microservice/server.js

const express = require('express');
const mongoose = require('mongoose');
const searchRoutes = require('./routes/searchRoutes');
const getDatabaseConfig = require('./config/database');

const cors = require('cors');

const app = express();
// const port = 30001;
app.use(cors());

const searchMicroserviceDbConfig = getDatabaseConfig('search_microservice');
mongoose.connect(searchMicroserviceDbConfig.database, searchMicroserviceDbConfig.options);

app.use(express.json());
app.use('/api', searchRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Search Microservice is running on port ${port}`);
});
