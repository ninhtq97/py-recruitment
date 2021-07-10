const sequelize = require('../configs/database');
const CandidateCareer = require('../models/CandidateCareer');

exports.createCandidateCareer = async (newCandidate, careerId) => {
  try {
    const careerIdArr = careerId.split(",");
    
    let dataBody = [];
    for (const item of careerIdArr) {
      const body = {
        candidateId: newCandidate.id,
        careerId: item,
      }
      dataBody.push(body);
    }

    await CandidateCareer.bulkCreate(dataBody);
  } catch (error) {
    throw error;
  }
};

exports.updateCandidateCareer = async (candidateId, careerId) => {
  const t = await sequelize.transaction();
  try {
    const careerIdArr = careerId.split(",");
    let dataBody = [];
    for (const item of careerIdArr) {
      const body = {
        candidateId,
        careerId: item,
      }
      dataBody.push(body);
    }

    await Promise.all([
      CandidateCareer.destroy({ where: { candidateId } }),
      CandidateCareer.bulkCreate(dataBody),
    ]);

    await t.commit();
    return true;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};


exports.getCandidateCareer = async (id) => {
  try {
    const rs = await CandidateCareer.findAll({ where: { candidateId: id } });

    return rs;
  } catch (err) {
    throw err;
  }
};

exports.getCandidateCareers = async () => {
  try {
    const rs = await CandidateCareer.findAll();

    return rs;
  } catch (error) {
    throw error;
  }
};