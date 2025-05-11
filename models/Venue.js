const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  SearchValue: { type: String, default: 'venues' },
  name: { type: String, required: true },
  location: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  addressLink: String,
  price: { type: String, required: true },
  hasAC: { type: Boolean, default: false },
  brideGroomRoomAC: { type: Boolean, default: false },
  guestRoomCount: Number,
  decoration: String,
  vegNonVeg: { type: String, enum: ['veg', 'nonVeg', 'both'], default: 'both' },
  seatingCapacity: Number,
  floatingCapacity: Number,
  diningCapacity: Number,
  cateringOption: { type: String, enum: ['in', 'out', 'both'], default: 'both' },
  carParkingCount: Number,
  hasGenerator: { type: Boolean, default: false },
  hasDJ: { type: Boolean, default: false },
  establishmentYear: Number,
  displayImages: [String],
  albumImages: [String],
  amenities: [String],
  otherInformation: [String],
  paymentPolicies: [String],
  services: [{
    name: String,
    price: String
  }],
  faqs: [{
    question: String,
    answer: String
  }],
  customFields: [{
    fieldName: String,
    fieldValue: String
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Venue', venueSchema);