const express = require('express');
const Appointment = require('../models/appointment');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate({
      path: 'doctorId',
      select: 'name specialization workingHours'
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  const { doctorId, date, patientName } = req.body;
  try {
    const newAppointment = new Appointment({ doctorId, date, patientName });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedAppointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json(updatedAppointment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) return res.status(404).json({ message: 'Appointment not found' });
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;