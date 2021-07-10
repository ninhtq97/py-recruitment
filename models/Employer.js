const Sequelize = require('sequelize');

const sequelize = require('../configs/database');

const Employer = sequelize.define(
  'employer',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    image: {
      type: Sequelize.STRING,
    },
    companyName: {
      type: Sequelize.STRING,
    },
    code: {
      type: Sequelize.STRING,
    },
    dateRange: {
      type: Sequelize.DATE,
    },
    issuedBy: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    countView: {
      type: Sequelize.INTEGER,
      defaultValue: 50,
    },
    isActive: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },
    countJob: {
      type: Sequelize.INTEGER,
      defaultValue: 50,
    },
  }
);

module.exports = Employer;
