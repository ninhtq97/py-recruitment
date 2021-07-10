const Sequelize = require('sequelize');

const sequelize = require('../configs/database');

const Config = sequelize.define(
  'config',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    
    countView: {
      type: Sequelize.INTEGER,
      defaultValue: 50,
    },
    
    countJob: {
      type: Sequelize.INTEGER,
      defaultValue: 50,
    },
  }
);

module.exports = Config;
