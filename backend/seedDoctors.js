const mongoose = require('mongoose');
const Doctor = require('./models/doctor'); // Make sure the path to your model is correct
require('dotenv').config();

// Connect to MongoDB Atlas
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Sample doctors data
const doctors = [
    {
        name: 'Dr. Alice Brown',
        workingHours: { start: '09:00', end: '17:00' },
        specialization: 'Pediatrics'
    },
    {
        name: 'Dr. John Doe',
        workingHours: { start: '10:00', end: '18:00' },
        specialization: 'Gynecology'
    },
    {
        name: 'Dr. Emma Green',
        workingHours: { start: '08:00', end: '14:00' },
        specialization: 'General Medicine'
    }
];

// Insert doctors into the collection
const seedDoctors = async () => {
    try {
        await Doctor.insertMany(doctors);
        console.log('Doctors added successfully!');
        mongoose.disconnect();
    } catch (error) {
        console.log('Error seeding doctors:', error);
        mongoose.disconnect();
    }
};

seedDoctors();
