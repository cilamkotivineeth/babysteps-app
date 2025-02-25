const Appointment = require('../models/Appointment');

// Get all appointments
const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('doctorId');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get appointment by ID
const getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id).populate('doctorId');
        if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new appointment
const createAppointment = async (req, res) => {
    const { doctorId, date, duration, appointmentType, patientName, notes } = req.body;

    try {
        const overlapping = await Appointment.findOne({
            doctorId,
            date: { $gte: date, $lt: new Date(new Date(date).getTime() + duration * 60000) }
        });

        if (overlapping) return res.status(400).json({ message: 'Time slot already booked' });

        const newAppointment = new Appointment({
            doctorId,
            date,
            duration,
            appointmentType,
            patientName,
            notes
        });

        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an appointment
const updateAppointment = async (req, res) => {
    try {
        const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Appointment canceled' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAppointments,
    getAppointmentById,
    createAppointment,
    updateAppointment,
    deleteAppointment
};
