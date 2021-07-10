const sequelize = require('../configs/database');

const CandidateLocation = sequelize.define('candidate_location');

module.exports = CandidateLocation;
