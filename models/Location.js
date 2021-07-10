const Sequelize = require('sequelize');

const sequelize = require('../configs/database');

const Location = sequelize.define(
  'location',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    name: {
      type: Sequelize.STRING,
    },

    image: {
      type: Sequelize.STRING,
    },
  }
);

module.exports = Location;
