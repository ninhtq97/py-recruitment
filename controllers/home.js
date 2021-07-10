const jobService = require('../services/job');
const locationService = require('../services/location');
const careerService = require('../services/career');
const jobLocationService = require('../services/jobLocation');
const jobCareerService = require('../services/jobCareer');
const moment = require('moment');
const { ROLE } = require('../constants/role');

exports.index = async (req, res) => {
  const { query } = req;

  console.log('Query:', query);

  const [
    data,
    hotJob,
    locations,
    careers,
    jobLocation,
    jobCareer
  ] = await Promise.all([
    jobService.getJobsHome(),
    jobService.getHotJobsHome(),
    locationService.getLocations(),
    careerService.getCareers(),
    jobLocationService.getJobLocations(),
    jobCareerService.getJobCareers(),
  ]);

  const user = req.session.user;
  const role = ROLE.CANDIDATE;
  return res.render('parts/home', {
    title: 'Trang chủ',
    data: data.rs,
    hotJob: hotJob.rs,
    moment,
    user,
    locations,
    careers,
    jobLocation,
    jobCareer,
    query,
    role,
  });
};