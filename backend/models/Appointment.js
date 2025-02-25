const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  patientName: { type: String, required: true },
  status: { type: String, default: 'scheduled' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);