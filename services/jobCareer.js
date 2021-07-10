const JobCareer = require('../models/JobCareer');
const sequelize = require('../configs/database');

exports.getJobCareer = async (id) => {
  try {
    const rs = await JobCareer.findAll({ where: { jobId: id } });
    return rs;
  } catch (err) {
    throw err;
  }
};

exports.getJobCareers = async () => {
  try {
    const rs = await JobCareer.findAll();
    return rs;
  } catch (err) {
    throw err;
  }
};

exports.createJobCareer = async (newJob, careerId) => {
  try {
    if (typeof careerId == 'string') {
      careerId = careerId.split(",");
    }
    const careerIdArr = careerId;
    
    let dataBody = [];
    for (const item of careerIdArr) {
      const body = {
        jobId: newJob.id,
        careerId: item,
      }
      dataBody.push(body);
    }

    await JobCareer.bulkCreate(dataBody);
  } catch (error) {
    throw error;
  }
};

exports.updateJobCareer = async (jobId, careerId) => {
  const t = await sequelize.transaction();
  try {
    const careerIdArr = careerId.split(",");
    let dataBody = [];
    for (const item of careerIdArr) {
      const body = {
        jobId,
        careerId: item,
      }
      dataBody.push(body);
    }

    await JobCareer.destroy({ where: { jobId } });
    await JobCareer.bulkCreate(dataBody);

    await t.commit();
    return true;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};