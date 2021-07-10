const configService = require('../services/config');

exports.postCountView = async (req, res) => {
  const { body } = req;

  console.log('Body:', body);

  const rs = await configService.postCountView(body);

  return res.send(rs);
};

exports.postCountJob = async (req, res) => {
  const { body } = req;

  console.log('Body:', body);

  const rs = await configService.postCountJob(body);

  return res.send(rs);
};