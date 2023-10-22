const mongoose = require('mongoose');

//create shema for model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: String, required: true }
});

// Create and export model for data in products colection
module.exports = mongoose.model('Product', productSchema);