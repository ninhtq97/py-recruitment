const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const ViewCount = sequelize.define(
  'view_count',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
  }
);

module.exports = ViewCount;
