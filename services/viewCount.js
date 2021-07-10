const ViewCount = require('../models/ViewCount');
const AppError = require('../utils/AppError');

exports.postCountView = async ({ candidateId, employerId }) => {
  try {
    const viewCount = await ViewCount.findOne({ where: { candidateId: candidateId, employerId: employerId } });
    if (viewCount) {
      return true;
    }
    await ViewCount.create({ candidateId, employerId });
    return true;
  } catch (error) {
    throw error;
  }
};

exports.checkCountView = async ({ employerId }) => {
  try {
    const data = await ViewCount.count({ where: { employerId: employerId } });
    return data;
  } catch (error) {
    throw error;
  }
};

exports.detailCountView = async ({ employerId, candidateId }) => {
  try {
    const viewCount = await ViewCount.findOne({ where: { candidateId: candidateId, employerId: employerId } });
    return viewCount;
  } catch (error) {
    throw error;
  }
};