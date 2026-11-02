const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// CREATE new patient
router.post('/', async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json({ success: true, patient });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// READ all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json({ success: true, patients });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// READ patient by ID
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });
    res.status(200).json({ success: true, patient });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// READ patient by name
router.get('/name/:name', async (req, res) => {
  try {
    const patients = await Patient.find({ name: req.params.name });
    res.status(200).json({ success: true, patients });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// UPDATE patient by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, updatedPatient });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// DELETE patient by ID
router.delete('/:id', async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
