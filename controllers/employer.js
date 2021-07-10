const employerService = require('../services/employer');

exports.getEmployers = async (req, res) => {
  const data = await employerService.getEmployers();

  return res.json(data);
};