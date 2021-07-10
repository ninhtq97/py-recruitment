const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const JobSubmitted = sequelize.define(
  'job_submitted',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
  }
);

module.exports = JobSubmitted;
