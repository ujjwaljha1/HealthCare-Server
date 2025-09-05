const Mapping = require('../models/Mapping');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

const getAllMappings = async (req, res) => {
  try {
    const mappings = await Mapping.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'lastName']
        },
        {
          model: Doctor,
          attributes: ['firstName', 'lastName', 'specialization']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(mappings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMappingsByPatient = async (req, res) => {
  try {
    const mappings = await Mapping.findAll({
      where: { patientId: req.params.patientId },
      include: [
        {
          model: Doctor,
          attributes: ['firstName', 'lastName', 'specialization', 'phone', 'email']
        }
      ],
      order: [['assignedDate', 'DESC']]
    });
    res.json(mappings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMapping = async (req, res) => {
  try {
    const { patientId, doctorId, notes } = req.body;
    const patient = await Patient.findOne({
      where: {
        id: patientId,
        userId: req.userId
      }
    });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    const mapping = await Mapping.create({
      patientId,
      doctorId,
      notes
    });
    const mappingWithDetails = await Mapping.findByPk(mapping.id, {
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'lastName']
        },
        {
          model: Doctor,
          attributes: ['firstName', 'lastName', 'specialization']
        }
      ]
    });
    res.status(201).json(mappingWithDetails);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'This patient is already assigned to this doctor' });
    }
    res.status(500).json({ error: error.message });
  }
};

const deleteMapping = async (req, res) => {
  try {
    const mapping = await Mapping.findByPk(req.params.id);
    if (!mapping) {
      return res.status(404).json({ error: 'Mapping not found' });
    }
    await mapping.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMappings,
  getMappingsByPatient,
  createMapping,
  deleteMapping
};