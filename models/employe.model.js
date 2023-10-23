const mongoose = require('mongoose');

//create shema for model
const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: String, required: true, ref: 'Department' },
  salary: { type: Number, required: true }
});

// Create and export model for data in employees colection
module.exports = mongoose.model('Employee', employeeSchema);