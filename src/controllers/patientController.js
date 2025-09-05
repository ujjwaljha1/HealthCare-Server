
const Patient = require('../models/Patient');

const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll({
      where: { userId: req.userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPatient = async (req, res) => {
  try {
    const patient = await Patient.create({
      ...req.body,
      userId: req.userId
    });
    
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    await patient.update(req.body);
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findOne({
      where: {
        id: req.params.id,
        userId: req.userId
      }
    });
    
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    
    await patient.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient
};