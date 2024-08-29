const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSchema = new Schema({
  category: { type: String, required: true }, // 'Natural', 'Cultural', 'Mixed'
  criteria_txt: { type: String }, 
  danger: { type: String }, // Danger status, if any
  date_inscribed: { type: String }, //Year of inscription
  extension: { type: Number }, // Number of extensions
  http_url: { type: String, required: true }, //URL of the site on UNESCO
  id_number: { type: Number, required: true, unique: true }, // Unique ID number
  image_url: { type: String }, //URL of an image of the site
  iso_code: { type: [String] }, // List of ISO country codes
  justification: { type: String }, // Justification for the inscription
  latitude: { type: Number, required: true }, // Latitude coordinate
  longitude: { type: Number, required: true }, // Longitude coordinate
  location: { type: String }, // not useful
  region: { type: String, required: true }, // Region of the site
  revision: { type: Number }, // Number of revisions
  secondary_dates: { type: [String] }, // List of secondary dates
  short_description: { type: String }, // Short description of the site
  site: { type: String, required: true }, // Name of the site
  states: { type: [String] }, // List of states or countries
  transboundary: { type: Boolean }, //Whether the site is transboundary
  unique_number: { type: Number, required: true, unique: true } //site Unique identifier
});

module.exports = mongoose.model('Site', siteSchema);
