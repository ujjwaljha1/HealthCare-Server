
const User = require('./User');
const Patient = require('./Patient');
const Doctor = require('./Doctor');
const Mapping = require('./Mapping');

User.hasMany(Patient, { foreignKey: 'userId' });
Patient.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Doctor, { foreignKey: 'userId' });
Doctor.belongsTo(User, { foreignKey: 'userId' });

Patient.hasMany(Mapping, { foreignKey: 'patientId' });
Mapping.belongsTo(Patient, { foreignKey: 'patientId' });

Doctor.hasMany(Mapping, { foreignKey: 'doctorId' });
Mapping.belongsTo(Doctor, { foreignKey: 'doctorId' });

module.exports = {
  User,
  Patient,
  Doctor,
  Mapping
};