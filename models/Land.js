const mongoose = require('mongoose');

const landSchema = new mongoose.Schema({
  address: String,
  price: String,
  contact: String,
  image: String,
  latitude: Number,
  longitude: Number,
});

module.exports = mongoose.model('Land', landSchema);
