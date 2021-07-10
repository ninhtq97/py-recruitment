const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const Career = sequelize.define(
  'career',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    //tên
    name: {
      type: Sequelize.STRING
    },

  }
);

module.exports = Career;
