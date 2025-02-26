# BabySteps Appointment Booking System Backend

This is the backend for the BabySteps appointment booking system, built using Node.js, Express.js, and MongoDB. It manages doctor details, available slots, and patient appointments.

## Deployment URL

Backend API is deployed on Render: [https://babysteps-app.onrender.com](https://babysteps-app.onrender.com/doctors)
https://babysteps-app.onrender.com/appointments

## Technologies Used

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js
- **MongoDB Atlas**: Cloud-hosted NoSQL database
- **Mongoose**: ODM for MongoDB
- **Socket.io (Optional)**: Real-time updates (optional feature)

## Setup and Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/babysteps-backend.git
cd babysteps-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
```

4. Start the server:

```bash
npm start
```

## API Endpoints

### Doctor Routes

- `GET /doctors` - Get list of doctors
- `POST /doctors` - Add a new doctor

### Appointment Routes

- `GET /appointments` - Get list of appointments
- `POST /appointments` - Book a new appointment
- `DELETE /appointments/:id` - Cancel an appointment

## MongoDB Models

- **Doctor**: Holds doctor details (name, specialization, availability)
- **Appointment**: Holds patient info, doctor info, and booked time slot

## Future Enhancements

- Real-time slot updates using Socket.io
- Advanced appointment validation and conflict prevention
- Detailed appointment history and patient records

## License

This project is licensed under the MIT License.

