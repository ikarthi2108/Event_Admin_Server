const Venue = require("../models/Venue");

// Create a new venue
exports.createVenue = async (req, res) => {
  try {
    // Get file paths from uploaded files
    const displayImages = req.files["displayImages"]?.map((file) => file.path) || [];
    const albumImages = req.files["albumImages"]?.map((file) => file.path) || [];

    // Create venue data object
    const venueData = {
      ...req.body,
      displayImages,
      albumImages,
      // Convert stringified arrays back to arrays
      amenities: req.body.amenities ? JSON.parse(req.body.amenities) : [],
      paymentPolicies: req.body.paymentPolicies ? JSON.parse(req.body.paymentPolicies) : [],
      services: req.body.services ? JSON.parse(req.body.services) : [],
      faqs: req.body.faqs ? JSON.parse(req.body.faqs) : [],
      customFields: req.body.customFields ? JSON.parse(req.body.customFields) : [],
    };

    // Create new venue
    const venue = new Venue(venueData);
    await venue.save();

    res.status(201).json({
      success: true,
      data: venue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get all venues with exact search term and district
exports.getAllVenues = async (req, res) => {
  try {
    const { searchValue, district } = req.query;

    // Build query object for exact match (case-insensitive)
    const query = {};
    if (searchValue) {
      query.SearchValue = { $regex: `^${searchValue}$`, $options: "i" };
    }
    if (district) {
      query.district = { $regex: `^${district}$`, $options: "i" };
    }

    // Fetch venues with exact match
    const venues = await Venue.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: venues.length,
      data: venues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single venue by ID
exports.getVenue = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);

    if (!venue) {
      return res.status(404).json({
        success: false,
        error: "Venue not found",
      });
    }

    res.status(200).json({
      success: true,
      data: venue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Get single venue by name
exports.getVenueByName = async (req, res) => {
  try {
    const { name } = req.params;
    const venue = await Venue.findOne({
      name: { $regex: `^${name}$`, $options: "i" },
    });

    if (!venue) {
      return res.status(404).json({
        success: false,
        error: "Venue not found",
      });
    }

    res.status(200).json({
      success: true,
      data: venue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update venue
exports.updateVenue = async (req, res) => {
  try {
    // Get file paths from uploaded files if any
    const displayImages = req.files["displayImages"]?.map((file) => file.path) || [];
    const albumImages = req.files["albumImages"]?.map((file) => file.path) || [];

    // Get existing venue
    const venue = await Venue.findById(req.params.id);
    if (!venue) {
      return res.status(404).json({
        success: false,
        error: "Venue not found",
      });
    }

    // Prepare update data
    const updateData = {
      ...req.body,
      // Combine existing images with new ones if not replacing all
      displayImages: displayImages.length > 0 ? [...venue.displayImages, ...displayImages] : venue.displayImages,
      albumImages: albumImages.length > 0 ? [...venue.albumImages, ...albumImages] : venue.albumImages,
      // Convert stringified arrays back to arrays if they exist
      amenities: req.body.amenities ? JSON.parse(req.body.amenities) : venue.amenities,
      paymentPolicies: req.body.paymentPolicies ? JSON.parse(req.body.paymentPolicies) : venue.paymentPolicies,
      services: req.body.services ? JSON.parse(req.body.services) : venue.services,
      faqs: req.body.faqs ? JSON.parse(req.body.faqs) : venue.faqs,
      customFields: req.body.customFields ? JSON.parse(req.body.customFields) : venue.customFields,
    };

    // Update venue
    const updatedVenue = await Venue.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: updatedVenue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete venue
exports.deleteVenue = async (req, res) => {
  try {
    const venue = await Venue.findByIdAndDelete(req.params.id);

    if (!venue) {
      return res.status(404).json({
        success: false,
        error: "Venue not found",
      });
    }

    // TODO: Delete associated images from the server

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};