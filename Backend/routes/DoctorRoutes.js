// // backend/routes/DoctorRoutes.js
// const express = require("express");
// const router = express.Router();
// const Doctor = require("../models/Doctor");

// // Create doctor
// router.post("/", async (req, res) => {
//   try {
//     const doctor = await Doctor.create(req.body);
//     res.status(201).json({ success: true, doctor });
//   } catch (error) {
//     res.status(500).json({ success: false, error });
//   }
// });

// // Get all doctors
// router.get("/", async (req, res) => {
//   try {
//     const doctors = await Doctor.find();
//     res.status(200).json({ success: true, doctors });
//   } catch (error) {
//     res.status(500).json({ success: false, error });
//   }
// });

// module.exports = router;


// routes/DoctorRoutes.js
const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// POST /api/doctors
router.post('/', async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ success: true, doctor });
  } catch (error) {
    console.error("Error creating doctor:", error);
    res.status(500).json({ success: false, error });
  }
});

// GET /api/doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});

module.exports = router;

