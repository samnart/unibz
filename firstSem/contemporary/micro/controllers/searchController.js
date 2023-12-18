// controllers/searchController.js

const Accommodation = require('../models/Accomodation');

const searchAccommodations = async (req, res) => {
    try {
        const { location, startDate, endDate } = req.query;

        // Implement logic to search accommodation based on provide criteria
        const accommodation = await Accommodation.find({
            location,
            availability: true,
            // Add more search criteria later
        });

        res.json({ accommodation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { searchAccommodations };