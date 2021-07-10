const sequelize = require('../configs/database');
const Logger = require('./logger');

const Employer = require('../models/Employer');
const Candidate = require('../models/Candidate');
const Job = require('../models/Job');
const Location = require('../models/Location');
const JobLocation = require('../models/JobLocation');
const Career = require('../models/Career');
const JobCareer = require('../models/JobCareer');
const CandidateLocation = require('../models/CandidateLocation');
const CandidateCareer = require('../models/CandidateCareer');
const User = require('../models/User');
const JobSubmitted = require('../models/JobSubmitted');
const ViewCount = require('../models/ViewCount');
const JobCount = require('../models/JobCount');

module.exports = async () => {
  User.hasMany(Employer, {
    foreignKey: { allowNull: false },
  });
  Employer.belongsTo(User);

  User.hasMany(Candidate, {
    foreignKey: { allowNull: false },
  });
  Candidate.belongsTo(User);

  Employer.hasMany(Job, {
    foreignKey: { allowNull: false },
  });
  Job.belongsTo(Employer);

  Job.belongsToMany(Location, {
    through: JobLocation,
    foreignKey: 'jobId',
  });

  Location.belongsToMany(Job, {
    through: JobLocation,
    foreignKey: 'locationId',
  });

  Job.belongsToMany(Career, {
    through: JobCareer,
    foreignKey: 'jobId',
  });

  Career.belongsToMany(Job, {
    through: JobCareer,
    foreignKey: 'careerId',
  });

  Candidate.belongsToMany(Location, {
    through: CandidateLocation,
    foreignKey: 'candidateId',
  });

  Location.belongsToMany(Candidate, {
    through: CandidateLocation,
    foreignKey: 'locationId',
  });

  Candidate.belongsToMany(Career, {
    through: CandidateCareer,
    foreignKey: 'candidateId',
  });

  Career.belongsToMany(Candidate, {
    through: CandidateCareer,
    foreignKey: 'careerId',
  });

  Job.belongsToMany(Candidate, {
    through: JobSubmitted,
    foreignKey: 'jobId',
  });

  Candidate.belongsToMany(Job, {
    through: JobSubmitted,
    foreignKey: 'candidateId',
  });

  Employer.hasMany(ViewCount, {
    foreignKey: { allowNull: false },
  });
  ViewCount.belongsTo(Employer);

  Candidate.hasMany(ViewCount, {
    foreignKey: { allowNull: false },
  });
  ViewCount.belongsTo(Candidate);

  Employer.hasMany(JobCount, {
    foreignKey: { allowNull: false },
  });
  JobCount.belongsTo(Employer);

  Job.hasMany(JobCount, {
    foreignKey: { allowNull: false },
  });
  JobCount.belongsTo(Job);

  return sequelize
    .sync({ alert: true })
    .then(async () => {
      Logger.success(`✌️ MySql Connected`);
    })
    .catch((error) => {
      Logger.error(`MySql Connection Error: ${error}`);
    });
};
