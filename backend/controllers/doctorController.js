const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const { format, addMinutes, isBefore, isEqual } = require('date-fns');

// Get all doctors
const getDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get available slots for a doctor on a specific date
const getDoctorSlots = async (req, res) => {
    const { id } = req.params;
    const { date } = req.query;

    try {
        const doctor = await Doctor.findById(id);
        if (!doctor) return res.status(404).json({ message: 'Doctor not found' });

        const startTime = new Date(`${date}T${doctor.workingHours.start}`);
        const endTime = new Date(`${date}T${doctor.workingHours.end}`);

        const appointments = await Appointment.find({
            doctorId: id,
            date: { $gte: startTime, $lt: endTime }
        });

        const bookedSlots = appointments.map(a => format(a.date, 'HH:mm'));

        let slots = [];
        let currentTime = startTime;

        while (isBefore(currentTime, endTime)) {
            const timeSlot = format(currentTime, 'HH:mm');
            if (!bookedSlots.includes(timeSlot)) {
                slots.push(timeSlot);
            }
            currentTime = addMinutes(currentTime, 30); // Assuming 30-min intervals
        }

        res.json(slots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDoctors, getDoctorSlots };
