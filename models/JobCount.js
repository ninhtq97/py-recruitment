const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const JobCount = sequelize.define(
  'job_count',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
  }
);

module.exports = JobCount;
