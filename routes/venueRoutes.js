const express = require('express');
const router = express.Router();
const { uploadVenueImages } = require('../config/multer');
const {
  createVenue,
  getAllVenues,
  getVenue,
  updateVenue,
  deleteVenue
} = require('../controllers/venueController');
const { getImage } = require('../controllers/uploadController');

// Create a venue (with image upload)
router.post('/', uploadVenueImages, createVenue);

// Get all venues
router.get('/', getAllVenues);

// Get single venue
router.get('/:id', getVenue);

// Update venue (with optional image upload)
router.put('/:id', uploadVenueImages, updateVenue);

// Delete venue
router.delete('/:id', deleteVenue);

// Serve images
router.get('/images/:filename', getImage);

module.exports = router;