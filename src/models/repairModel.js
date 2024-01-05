const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Repair = sequelize.define('Repair', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
});

module.exports = Repair;