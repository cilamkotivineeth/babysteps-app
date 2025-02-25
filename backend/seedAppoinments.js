const mongoose = require('mongoose');
const Appointment = require('./models/appointment'); // Adjust path if needed

mongoose.connect('YOUR_MONGO_ATLAS_URI')
  .then(async () => {
    console.log('Connected to MongoDB Atlas');
    
    const sampleAppointments = [
      {
        doctorId: '65d91f5e56e234001234abcd',
        date: '2025-02-26T10:00:00Z',
        duration: 30,
        appointmentType: 'Routine Check-Up',
        patientName: 'John Doe',
        notes: 'First visit'
      },
      {
        doctorId: '65d91f5e56e234001234abcd',
        date: '2025-02-27T11:00:00Z',
        duration: 60,
        appointmentType: 'Ultrasound',
        patientName: 'Jane Smith',
        notes: 'Follow-up'
      }
    ];

    await Appointment.insertMany(sampleAppointments);
    console.log('Sample appointments added');
    mongoose.disconnect();
  })
  .catch(err => console.error(err));
