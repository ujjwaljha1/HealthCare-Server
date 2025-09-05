const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./src/config/database');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});
require('./src/models');

const initializeDatabase = async () => {
  try {
    console.log('Attempting');
    await connectDB();
    const { sequelize } = require('./src/config/database');
    await sequelize.sync({ alter: true });
    console.log(' synchronized');
  } catch (error) {
    console.error('Failed to initialize database:', error.message);
    process.exit(1);
  }
};

initializeDatabase();

const authRoutes = require('./src/routes/authRoutes');
const patientRoutes = require('./src/routes/patientRoutes');
const doctorRoutes = require('./src/routes/doctorRoutes');
const mappingRoutes = require('./src/routes/mappingRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/mappings', mappingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit: http://localhost:${PORT}`);
});