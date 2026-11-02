
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Create a new appointment
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      department,
      doctor,
      date,
      time,
      reason,
      emergency,
      reminderType,
      paymentMethod
    } = req.body;

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !department ||
      !doctor ||
      !date ||
      !time ||
      !reason?.trim()
    ) {
      return res.status(400).json({
        message: 'Please provide all required appointment details.'
      });
    }

    const appointment = await Appointment.create({
      name,
      email,
      phone,
      department,
      doctor,
      date,
      time,
      reason,
      emergency: Boolean(emergency),
      reminderType,
      paymentMethod
    });

    return res.status(201).json({
      message: 'Appointment booked successfully!',
      appointment
    });
  } catch (error) {
    console.error('Appointment booking error:', error.message);
    return res.status(500).json({
      message: 'Failed to book appointment. Please try again.'
    });
  }
});

// Get all appointments (for testing/admin use)
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error('Fetch appointments error:', error.message);
    res.status(500).json({ message: 'Failed to fetch appointments.' });
  }
});

/* Update an appointment status */
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Pending', 'Confirmed', 'Cancelled'].includes(status)) {
      return res.status(400).json({
        message: 'Invalid appointment status.'
      });
    }

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!appointment) {
      return res.status(404).json({
        message: 'Appointment not found.'
      });
    }

    res.status(200).json({
      message: `Appointment ${status.toLowerCase()} successfully.`,
      appointment
    });
  } catch (error) {
    console.error('Update appointment error:', error.message);
    res.status(500).json({
      message: 'Failed to update appointment status.'
    });
  }
});

module.exports = router;
