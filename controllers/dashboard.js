const dashboardService = require('../services/dashboard');
const moment = require('moment');
const candidateService = require('../services/candidate');
const candidateLocationService = require('../services/candidateLocation');
const candidateCareerService = require('../services/candidateCareer');
const locationService = require('../services/location');
const careerService = require('../services/career');
const jobLocationService = require('../services/jobLocation');
const jobCareerService = require('../services/jobCareer');
const jobService = require('../services/job');
const employerService = require('../services/employer');
const configService = require('../services/config');
const jocCountService = require('../services/jobCount');

// Employer
exports.indexEmployer = async (req, res) => {
  const [listEmployer, config] = await Promise.all([
    dashboardService.listEmployer(req.query),
    configService.getConfig(),
  ]);
  return res.render('dashboard/parts/admin/employer/list', {
    title: 'Quản lí nhà tuyển dụng',
    page: "employers",
    moment,
    employer: listEmployer.rs,
    query: req.query,
    current: req.query.page || 1,
    pages: Math.ceil(listEmployer.count / 10),
    config,
  });
};

exports.createEmployer = async (req, res) => {
  return res.render('dashboard/parts/admin/employer/create', {
    title: 'Thêm mới nhà tuyển dụng',
  });
};

exports.postCreateEmployer = async (req, res) => {
  const rs = await dashboardService.createEmployer(req.body, req.files);
  return res.send(rs);
};

exports.editEmployer = async (req, res) => {
  const detailEmployer = await employerService.getEmployer(req.params.employerId);
  return res.render('dashboard/parts/admin/employer/edit', {
    title: 'Sửa nhà tuyển dụng',
    detail: detailEmployer,
    moment,
  });
};

exports.postEditEmployer = async (req, res) => {
  req.body.employerId = req.params.employerId;
  const rs = await dashboardService.editEmployer(req.body, req.files);
  return res.send(rs);
};

exports.deleteEmployer = async (req, res) => {
  const deleteEmployer = await dashboardService.deleteEmployer(req.params.employerId);
  return res.send(deleteEmployer);
};

// Candidate
exports.indexCandidate = async (req, res) => {
  const [listCandidate, candidateLocation, candidateCareer, location, career] = await Promise.all([
    dashboardService.listCandidate(req.query),
    candidateLocationService.getCandidateLocations(),
    candidateCareerService.getCandidateCareers(),
    locationService.getLocations(),
    careerService.getCareers(),
  ]);
  return res.render('dashboard/parts/admin/candidate/list', {
    title: 'Quản lí ứng viên',
    page: "candidates",
    moment,
    candidate: listCandidate.rs,
    candidateLocation,
    candidateCareer,
    location,
    career,
    query: req.query,
    current: req.query.page || 1,
    pages: Math.ceil(listCandidate.count / 10),
  });
};

exports.createCandidate = async (req, res) => {
  const [location, career] = await Promise.all([
    locationService.getLocations(),
    careerService.getCareers(),
  ]);
  return res.render('dashboard/parts/admin/candidate/create', {
    title: 'Thêm mới ứng viên',
    location,
    career,
  });
};

exports.postCreateCandidate = async (req, res) => {
  const rs = await dashboardService.createCandidate(req.body, req.files);
  return res.send(rs);
};

exports.editCandidate = async (req, res) => {
  const { candidateId } = req.params;

  const [data, candidateLocation, candidateCareer, location, career] = await Promise.all([
    candidateService.detailCandidate(candidateId),
    candidateLocationService.getCandidateLocation(candidateId),
    candidateCareerService.getCandidateCareer(candidateId),
    locationService.getLocations(),
    careerService.getCareers()
  ]);

  location.map(i => {
    i.check = false;
    candidateLocation.filter(cl => {
      if (cl.locationId === i.id) {
        i.check = true;
      }
      return i;
    })
  });

  career.map(i => {
    i.check = false;
    candidateCareer.filter(cc => {
      if (cc.careerId === i.id) {
        i.check = true;
      }
      return i;
    })
  });

  return res.render('dashboard/parts/admin/candidate/edit', {
    title: 'Sửa ứng viên',
    detail: data,
    location,
    career,
    moment,
  });
};

exports.postEditCandidate = async (req, res) => {
  req.body.candidateId = req.params.candidateId;
  const rs = await dashboardService.editCandidate(req.body, req.files);
  return res.send(rs);
};

exports.deleteCandidate = async (req, res) => {
  const deleteCandidate = await dashboardService.deleteCandidate(req.params.candidateId);
  return res.send(deleteCandidate);
};

// Location
exports.indexLocation = async (req, res) => {
  const listLocation = await dashboardService.listLocation(req.query);
  return res.render('dashboard/parts/admin/location/list', {
    title: 'Quản lí địa điểm',
    page: "locations",
    moment,
    location: listLocation.rs,
    query: req.query,
    current: req.query.page || 1,
    pages: Math.ceil(listLocation.count / 10),
  });
};

exports.createLocation = async (req, res) => {
  return res.render('dashboard/parts/admin/location/create', {
    title: 'Thêm mới địa điểm',
  });
};

exports.postCreateLocation = async (req, res) => {
  const rs = await dashboardService.createLocation(req.body, req.files);
  return res.send(rs);
};

exports.editLocation = async (req, res) => {
  const detailLocation = await locationService.getLocation(req.params.locationId);
  return res.render('dashboard/parts/admin/location/edit', {
    title: 'Sửa địa điểm',
    detail: detailLocation,
    moment,
  });
};

exports.postEditLocation = async (req, res) => {
  req.body.locationId = req.params.locationId;
  const rs = await dashboardService.editLocation(req.body, req.files);
  return res.send(rs);
};

exports.deleteLocation = async (req, res) => {
  const deleteLocation = await dashboardService.deleteLocation(req.params.locationId);
  return res.send(deleteLocation);
};

// Career
exports.indexCareer = async (req, res) => {
  const listCareer = await dashboardService.listCareer(req.query);
  return res.render('dashboard/parts/admin/career/list', {
    title: 'Quản lí ngành nghề',
    page: "careers",
    moment,
    career: listCareer.rs,
    query: req.query,
    current: req.query.page || 1,
    pages: Math.ceil(listCareer.count / 10),
  });
};

exports.createCareer = async (req, res) => {
  return res.render('dashboard/parts/admin/career/create', {
    title: 'Thêm mới ngành nghề',
  });
};

exports.postCreateCareer = async (req, res) => {
  const rs = await dashboardService.createCareer(req.body);
  return res.send(rs);
};

exports.editCareer = async (req, res) => {
  const detailCareer = await careerService.getCareer(req.params.careerId);
  return res.render('dashboard/parts/admin/career/edit', {
    title: 'Sửa ngành nghề',
    detail: detailCareer,
    moment,
  });
};

exports.postEditCareer = async (req, res) => {
  req.body.careerId = req.params.careerId;
  const rs = await dashboardService.editCareer(req.body);
  return res.send(rs);
};

exports.deleteCareer = async (req, res) => {
  const deleteCareer = await dashboardService.deleteCareer(req.params.careerId);
  return res.send(deleteCareer);
};

// JobSubmitted
exports.indexJobSubmittedAdmin = async (req, res) => {
  const { query } = req;

  console.log('Query:', query);

  const data = await dashboardService.listJobSubmittedAdmin(query);

  return res.render('dashboard/parts/admin/jobSubmitted/list', {
    title: 'Quản lí danh sách ứng tuyển',
    page: "jobSubmits",
    moment,
    data: data.rs,
    query: req.query,
    current: req.query.page || 1,
    pages: Math.ceil(data.count / 10),
  });
};

exports.indexJobSubmittedEmployer = async (req, res) => {
  const { query, session } = req;

  console.log('Query:', query);

  const data = await dashboardService.listJobSubmittedEmployer(query, session);

  return res.render('dashboard/parts/employer/jobSubmitted/list', {
    title: 'Quản lí danh sách ứng tuyển',
    page: "jobSubmits",
    moment,
    data: data.rs,
    query: req.query,
    current: req.query.page || 1,
    pages: Math.ceil(data.count / 10),
  });
};

exports.deleteJobSubmitted = async (req, res) => {
  const data = await dashboardService.deleteJobSubmitted(req.params.jobSubmittedId);
  return res.send(data);
};

// Info Employer
exports.infoEmployer = async (req, res) => {
  const { user } = req.session;
  const detailEmployer = await employerService.getEmployerUserId(user.id);
  return res.render('dashboard/parts/employer/info', {
    title: 'Thông tin doanh nghiệp',
    detail: detailEmployer,
    moment,
  });
};

exports.updateInfoEmployer = async (req, res) => {
  const { id } = req.session.user;
  const { body } = req;

  console.log('Body: ', body);

  const rs = await employerService.updateEmployer(id, body, req.files);
  return res.send(rs);
};

// Job
exports.indexJob = async (req, res) => {
  const { user } = req.session;
  const [listJob, jobLocation, jobCareer, location, career] = await Promise.all([
    dashboardService.listJob(req.query, user),
    jobLocationService.getJobLocations(),
    jobCareerService.getJobCareers(),
    locationService.getLocations(),
    careerService.getCareers(),
  ]);
  return res.render('dashboard/parts/employer/job/list', {
    title: 'Quản lí công việc',
    page: "jobs",
    moment,
    job: listJob.rs,
    jobLocation,
    jobCareer,
    location,
    career,
    query: req.query,
    current: req.query.page || 1,
    pages: Math.ceil(listJob.count / 10),
  });
};

exports.createJob = async (req, res) => {
  const { user } = req.session;
  const [getEmployer, location, career] = await Promise.all([
    employerService.getEmployerUserId(user.id),
    locationService.getLocations(),
    careerService.getCareers()
  ]);
  return res.render('dashboard/parts/employer/job/create', {
    title: 'Thêm mới công việc',
    user,
    getEmployer,
    location,
    career,
    moment,
  });
};

exports.postCreateJob = async (req, res) => {
  const { user } = req.session;
  let employer = await employerService.getEmployerUserId(user.id);
  let checkCountJob = await jocCountService.checkCountJob({ employerId: employer.id });
  console.log('1', checkCountJob)
  console.log('2', employer.countJob)

  if (checkCountJob >= employer.countJob) {
    return res.send('Hết số lần đăng bài trong ngày hôm nay');
  } else {
    const rs = await dashboardService.createJob(req.body, user);
    return res.send(rs);
  }

};

exports.editJob = async (req, res) => {
  const { user } = req.session;
  const { jobId } = req.params;

  const [getEmployer, detailJob, jobLocation, jobCareer, location, career] = await Promise.all([
    employerService.getEmployerUserId(user.id),
    jobService.detailJob(jobId),
    jobLocationService.getJobLocation(jobId),
    jobCareerService.getJobCareer(jobId),
    locationService.getLocations(),
    careerService.getCareers(),
  ]);

  location.map(i => {
    i.check = false;
    jobLocation.filter(jl => {
      if (jl.locationId === i.id) {
        i.check = true;
      }
      return i;
    })
  });

  career.map(i => {
    i.check = false;
    jobCareer.filter(jc => {
      if (jc.careerId === i.id) {
        i.check = true;
      }
      return i;
    })
  });

  return res.render('dashboard/parts/employer/job/edit', {
    title: 'Sửa công việc',
    detail: detailJob,
    jobLocation,
    jobCareer,
    location,
    career,
    moment,
    user,
    getEmployer,
  });
};

exports.postEditJob = async (req, res) => {
  req.body.jobId = req.params.jobId;
  const rs = await dashboardService.editJob(req.body);
  return res.send(rs);
};

exports.deleteJob = async (req, res) => {
  const deleteJob = await dashboardService.deleteJob(req.params.jobId);
  return res.send(deleteJob);
};

exports.getUpdateProfile = async (req, res) => {
  const { user } = req.session;
  const getCandidate = await candidateService.getCandidateAcc(user.id);
  const { id } = getCandidate;

  const [data, candidateLocation, candidateCareer, location, career] = await Promise.all([
    candidateService.detailCandidate(id),
    candidateLocationService.getCandidateLocation(id),
    candidateCareerService.getCandidateCareer(id),
    locationService.getLocations(),
    careerService.getCareers(),
  ]);

  location.map(i => {
    i.check = false;
    candidateLocation.filter(cl => {
      if (cl.locationId === i.id) {
        i.check = true;
      }
      return i;
    })
  });

  career.map(i => {
    i.check = false;
    candidateCareer.filter(cc => {
      if (cc.careerId === i.id) {
        i.check = true;
      }
      return i;
    })
  });

  return res.render('dashboard/parts/candidate/updateProfileDashboard', {
    title: 'Cập nhật hồ sơ',
    detail: data,
    location,
    career,
    moment,
    user,
  });
};

exports.postUpdateProfile = async (req, res) => {
  const { user } = req.session;
  const getCandidate = await candidateService.getCandidateAcc(user.id);
  req.body.candidateId = getCandidate.id;

  const rs = await dashboardService.editCandidate(req.body, req.files);
  return res.send(rs);
};