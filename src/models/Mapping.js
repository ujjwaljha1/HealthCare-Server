const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class Mapping extends Model {}

Mapping.init({
  notes: { type: DataTypes.TEXT, defaultValue: '' },
  assignedDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Patients',
      key: 'id'
    }
  },
  doctorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Doctors',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Mapping',
  indexes: [
    { unique: true, fields: ['patientId', 'doctorId'] }
  ]
});

module.exports = Mapping;