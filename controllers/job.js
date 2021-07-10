const jobService = require('../services/job');
const jobLocationService = require('../services/jobLocation');
const jobCareerService = require('../services/jobCareer');
const locationService = require('../services/location');
const careerService = require('../services/career');
const employerService = require('../services/employer');
const moment = require('moment');
const { ROLE } = require('../constants/role');

exports.detailJob = async (req, res) => {
  const { jobId } = req.params;

  console.log('Params:', jobId);
  
  const [detailJob, jobLocation, jobCareer, locations, careers, employerJob, plusView] = await Promise.all([
    jobService.detailJob(jobId),
    jobLocationService.getJobLocation(jobId),
    jobCareerService.getJobCareer(jobId),
    locationService.getLocations(),
    careerService.getCareers(),
    jobService.employerJob(),
    jobService.plusView(jobId),
  ]);

  const employerId = detailJob.employerId;
  const employer = await employerService.getEmployer(employerId);

  const user = req.session.user;
  const role = ROLE.CANDIDATE;
  return res.render('parts/detailJob', {
    title: detailJob.name,
    detail: detailJob,
    jobLocation,
    jobCareer,
    locations,
    careers,
    employer,
    employerJob,
    moment,
    user,
    role,
  });
};

exports.getJobs = async (req, res) => {
  const { query } = req;

  console.log('Query:', query);

  const [data, locations, careers, jobLocation, jobCareer] = await Promise.all([
    jobService.getJobs(query),
    locationService.getLocations(),
    careerService.getCareers(),
    jobLocationService.getJobLocations(),
    jobCareerService.getJobCareers(),
  ]);

  const user = req.session.user;
  const role = ROLE.CANDIDATE;
  return res.render('parts/getJobs', {
    data: data.rs,
    count: data.count,
    locations,
    careers,
    jobLocation,
    jobCareer,
    moment,
    user,
    query,
    role,
    page: "jobs",
    current: query.page || 1,
    pages: Math.ceil(data.count / 10),
  });
};

exports.getHotJobs = async (req, res) => {
  const { query } = req;

  console.log('Query:', query);

  const [data, locations, careers, jobLocation, jobCareer] = await Promise.all([
    jobService.getHotJobs(query),
    locationService.getLocations(),
    careerService.getCareers(),
    jobLocationService.getJobLocations(),
    jobCareerService.getJobCareers(),
  ]);
  
  const user = req.session.user;
  const role = ROLE.CANDIDATE;
  return res.render('parts/getHotJobs', {
    data: data.rs,
    count: data.count,
    locations,
    careers,
    jobLocation,
    jobCareer,
    moment,
    user,
    query,
    role,
    page: "hot-jobs",
    current: query.page || 1,
    pages: Math.ceil(data.count / 3),
  });
};

exports.postJobSubmit = async (req, res) => {
  const { params, session } = req;

  console.log('Params:', params);

  const data = await jobService.postJobSubmit(params, session);

  return res.json(data);
};