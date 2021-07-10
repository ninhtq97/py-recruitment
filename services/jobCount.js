const JobCount = require('../models/JobCount');
const AppError = require('../utils/AppError');

exports.postCountJob = async ({ jobId, employerId }) => {
  try {
    const jobCount = await JobCount.findOne({ where: { jobId: jobId, employerId: employerId } });
    if (jobCount) {
      return true;
    }
    await JobCount.create({ jobId, employerId });
    return true;
  } catch (error) {
    throw error;
  }
};

exports.checkCountJob = async ({ employerId }) => {
  try {
      console.log(employerId)
    const data = await JobCount.count({ where: { employerId: employerId } });
    return data;
  } catch (error) {
    throw error;
  }
};