const Career = require('../models/Career');

exports.getCareers = async () => {
  try {
    const rs = await Career.findAll();
    return rs;
  } catch (err) {
    throw err;
  }
};

exports.getCareer = async (id) => {
  try {
    const rs = await Career.findOne({ where: { id } });
    return rs;
  } catch (err) {
    throw err;
  }
};