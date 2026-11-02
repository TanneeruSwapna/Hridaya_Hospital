
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    department: {
      type: String,
      required: true
    },
    doctor: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    reason: {
      type: String,
      required: true,
      trim: true
    },
    emergency: {
      type: Boolean,
      default: false
    },
    reminderType: {
      type: String,
      enum: ['email', 'sms', 'both', 'none'],
      default: 'email'
    },
    paymentMethod: {
      type: String,
      default: 'none'
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled'],
      default: 'Pending'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
