// models/Apartment.js

const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
    name: String,
    location: String,
    price: Number,
});

module.exports = mongoose.model('Apartment', apartmentSchema);