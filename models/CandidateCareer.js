const sequelize = require('../configs/database');

const CandidateCareer = sequelize.define('candidate_career');

module.exports = CandidateCareer;
