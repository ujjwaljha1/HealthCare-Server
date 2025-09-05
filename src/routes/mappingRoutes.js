const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getAllMappings,
  getMappingsByPatient,
  createMapping,
  deleteMapping
} = require('../controllers/mappingController');

router.use(authMiddleware);

router.get('/', getAllMappings);
router.get('/:patientId', getMappingsByPatient);
router.post('/', createMapping);
router.delete('/:id', deleteMapping);

module.exports = router;