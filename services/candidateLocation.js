const sequelize = require('../configs/database');
const CandidateLocation = require('../models/CandidateLocation');

exports.createCandidateLocation = async (newCandidate, locationId) => {
  try {
    const locationIdArr = locationId.split(",");
    let dataBody = [];
    for (const item of locationIdArr) {
      const body = {
        candidateId: newCandidate.id,
        locationId: item,
      }
      dataBody.push(body);
    }

    await CandidateLocation.bulkCreate(dataBody);
  } catch (error) {
    throw error;
  }
};

exports.updateCandidateLocation = async (candidateId, locationId) => {
  const t = await sequelize.transaction();
  try {
    const locationIdArr = locationId.split(",");
    let dataBody = [];
    for (const item of locationIdArr) {
      const body = {
        candidateId,
        locationId: item,
      }
      dataBody.push(body);
    }

    await Promise.all([
      CandidateLocation.destroy({ where: { candidateId } }),
      CandidateLocation.bulkCreate(dataBody),
    ]);

    await t.commit();
    return true;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

exports.getCandidateLocation = async (candidateId) => {
  try {
    const rs = await CandidateLocation.findAll({ where: { candidateId } });
    
    return rs;
  } catch (err) {
    throw err;
  }
};

exports.getCandidateLocations = async () => {
  try {
    const rs = await CandidateLocation.findAll();

    return rs;
  } catch (error) {
    throw error;
  }
};

