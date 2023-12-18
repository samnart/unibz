// models/Booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    accommodationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Accommodation' },
    startDate:Date,
    endDate: Date,
});

module.exports = mongoose.model('Booking', bookingSchema);