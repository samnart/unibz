// db.js

const mongoose = require('mongoose');

function connectToDatabase(uri) {
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  return db;
}

module.exports = connectToDatabase;
