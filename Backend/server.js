
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

const chatRoutes = require('./routes/ChatRoutes');
const patientRoutes = require('./routes/PatientRoutes');
const appointmentRoutes = require('./routes/AppointmentRoutes');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hi from Express');
});

app.use('/api/patients', patientRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/appointments', appointmentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });
