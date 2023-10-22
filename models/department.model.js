const mongoose = require('mongoose');

//create shema for model
const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

// Create and export model for data in departments colection
module.exports = mongoose.model('Department', departmentSchema);