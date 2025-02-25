const express = require('express');
const Doctor = require('../models/doctor');
const router = express.Router();

router.get('/', async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

router.post('/', async (req, res) => {
  const { name, workingHours, specialization } = req.body;
  try {
    const newDoctor = new Doctor({ name, workingHours, specialization });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;