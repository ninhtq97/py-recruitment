const JobLocation = require('../models/JobLocation');
const sequelize = require('../configs/database');

exports.getJobLocation = async (id) => {
  try {
    const rs = await JobLocation.findAll({ where: { jobId: id } });
    return rs;
  } catch (err) {
    throw err;
  }
};

exports.getJobLocations = async () => {
  try {
    const rs = await JobLocation.findAll();
    return rs;
  } catch (err) {
    throw err;
  }
};

exports.createJobLocation = async (newJob, locationId) => {
  try {
    if (typeof locationId == 'string') {
      locationId = locationId.split(",");
    }

    const locationIdArr = locationId;
    let dataBody = [];
    for (const item of locationIdArr) {
      const body = {
        jobId: newJob.id,
        locationId: item,
      }
      dataBody.push(body);
    }

    await JobLocation.bulkCreate(dataBody);
  } catch (error) {
    throw error;
  }
};

exports.updateJobLocation = async (jobId, locationId) => {
  const t = await sequelize.transaction();
  try {
    const locationIdArr = locationId.split(",");
    let dataBody = [];
    for (const item of locationIdArr) {
      const body = {
        jobId,
        locationId: item,
      }
      dataBody.push(body);
    }

    await JobLocation.destroy({ where: { jobId } });
    await JobLocation.bulkCreate(dataBody);

    await t.commit();
    return true;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};