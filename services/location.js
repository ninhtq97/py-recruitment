const Location = require('../models/Location');

exports.getLocations = async () => {
  try {
    const rs = await Location.findAll();
    return rs;
  } catch (err) {
    throw err;
  }
};

exports.getLocation = async (id) => {
  try {
    const rs = await Location.findOne({ where: { id } });
    return rs;
  } catch (err) {
    throw err;
  }
};