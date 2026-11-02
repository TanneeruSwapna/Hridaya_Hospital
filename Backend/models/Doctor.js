// models/Doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  experience: {
    type: Number, // in years
    required: true
  },
  availability: {
    type: String, // example: "Mon-Fri, 9AM-5PM"
    required: true
  },
  contact: {
    type: String
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);
