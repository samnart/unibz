// // apartment-microservice/routes/apartmentRoutes.js

// const express = require('express');
// const router = express.Router();
// const { getApartments, createApartment } = require('../controllers/apartmentController');  // Import getApartments and createApartment functions
// const Apartment = require('../models/Apartment');

// module.exports = (channel) => {
//   router.get('/apartments', getApartments);  // Use the imported getApartments function

//   router.post('/apartments', async (req, res) => {
//     try {
//       const { name, location, price } = req.body;

//       const newApartment = new Apartment({
//         name,
//         location,
//         price,
//       });

//       channel.sendToQueue('apartment_queue', Buffer.from(JSON.stringify(newApartment)));

//       res.status(201).json({ message: 'Apartment added successfully' });
//     } catch (error) {
//       console.error('Error creating apartment:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

//   return router;
// };

// apartment-microservice/routes/apartmentRoutes.js

const express = require('express');
const router = express.Router();
const { getApartments, createApartment } = require('../controllers/apartmentController');
const Apartment = require('../models/Apartment');

module.exports = (channel) => {
  router.get('/apartments', getApartments);

  router.post('/apartments', async (req, res) => {
    try {
      const { name, location, price } = req.body;

      const newApartment = new Apartment({
        name,
        location,
        price,
      });

      // Save the apartment to the local database
      await newApartment.save();

      // Send the apartment details to RabbitMQ queue (producer)
      channel.assertQueue('apartment_queue', { durable: false });
      channel.sendToQueue('apartment_queue', Buffer.from(JSON.stringify(newApartment)));

      res.status(201).json({ message: 'Apartment added successfully' });
    } catch (error) {
      console.error('Error creating apartment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  return router;
};
