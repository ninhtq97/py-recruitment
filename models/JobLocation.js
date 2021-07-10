const sequelize = require('../configs/database');

const JobLocation = sequelize.define('job_location');

module.exports = JobLocation;
