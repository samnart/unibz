// config/database.js

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/my_database_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});