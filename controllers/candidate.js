const candidateService = require('../services/candidate');
const candidateLocationService = require('../services/candidateLocation');
const candidateCareerService = require('../services/candidateCareer');
const locationService = require('../services/location');
const careerService = require('../services/career');
const dashboardService = require('../services/dashboard');
const viewCountService = require('../services/viewCount');
const Employer = require('../models/Employer');
const { ROLE } = require('../constants/role');
const User = require('../models/User');
const moment = require('moment');

exports.getCandidates = async (req, res) => {
  const data = await candidateService.getCandidates();

  return res.json(data);
};

exports.detailCandidate = async (req, res) => {
  const { user } = req.session;
  const { candidateId } = req.params;

  if (user && user.role === ROLE.EMPLOYER) {
    email = user.email;
    role = user.role;
    const employer = await Employer.findOne({ include: { model: User, where: { email, role } } });
    const detailCountView = await viewCountService.detailCountView({candidateId: candidateId, employerId: employer.id})
    if(!detailCountView){
      const countView = await viewCountService.checkCountView({employerId: employer.id})
      if(countView >= employer.countView){
        return res.render('parts/error');
      }
      await viewCountService.postCountView({candidateId: candidateId, employerId: employer.id})
    }
  }

  const [data, candidateLocation, candidateCareer, locations, careers] = await Promise.all([
    candidateService.detailCandidate(candidateId),
    candidateLocationService.getCandidateLocation(candidateId),
    candidateCareerService.getCandidateCareer(candidateId),
    locationService.getLocations(),
    careerService.getCareers(),
  ]);

  locations.map(i => {
    i.check = false;
    candidateLocation.filter(cl => {
      if(cl.locationId === i.id){
        i.check = true;
      }
      return i;
    })
  });

  careers.map(i => {
    i.check = false;
    candidateCareer.filter(cc => {
      if(cc.careerId === i.id){
        i.check = true;
      }
      return i;
    })
  });

  const roleAdmin = ROLE.ADMIN;
  const roleEmployer = ROLE.EMPLOYER;
  return res.render('parts/detailCandidate', {
    detail: data,
    locations,
    careers,
    moment,
    user,
    roleAdmin,
    roleEmployer
  });
};

// exports.allCandidate = async (req, res) => {
//   const { query } = req;

//   console.log('Query:', query);

//   const [data, locations, careers] = await Promise.all([
//     candidateService.getCandidates(query),
//     locationService.getLocations(),
//     careerService.getCareers(),
//   ]);

//   const user = req.session.user;
//   return res.render('parts/listCandidate', {
//     data: data.rs,
//     count: data.count,
//     moment,
//     user,
//     locations,
//     careers,
//     query,
//   });
// };

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
      if(cl.locationId === i.id){
        i.check = true;
      }
      return i;
    })
  });

  career.map(i => {
    i.check = false;
    candidateCareer.filter(cc => {
      if(cc.careerId === i.id){
        i.check = true;
      }
      return i;
    })
  });

  return res.render('dashboard/parts/candidate/updateProfile', {
    title: 'Cập nhật hồ sơ',
    detail: data,
    location,
    career,
    moment,
    user,
  });
};

exports.getJobSubmitted = async (req, res) => {
  const { query, session } = req;

  console.log('Query:', query);

  const getCandidate = await candidateService.getCandidateAcc(session.user.id);
  const { id } = getCandidate;

  const [detail, data] = await Promise.all([
    candidateService.detailCandidate(id),
    candidateService.listJobSubmitted(query, session),
  ]);
  return res.render('dashboard/parts/candidate/jobSubmitted', {
    page:"job-submitted",
    moment,
    detail,
    data: data.rs,
    query: req.query,
    current: req.query.page || 1,
    pages: Math.ceil(data.count / 10),
  });
};

exports.deleteJobSubmitted = async (req, res) => {
  const data = await candidateService.deleteJobSubmitted(req.params.jobSubmittedId);
  return res.send(data);
};

exports.postUpdateProfile = async (req, res) => {
  const { user } = req.session;
  const getCandidate = await candidateService.getCandidateAcc(user.id);
  req.body.candidateId = getCandidate.id;

  const rs = await dashboardService.editCandidate(req.body, req.files);
  return res.send(rs);
};

exports.postUpdateAvatar = async (req, res) => {
  const { user } = req.session;
  const getCandidate = await candidateService.getCandidateAcc(user.id);
  req.body.candidateId = getCandidate.id;

  const rs = await candidateService.postUpdateAvatar(req.body, req.files);
  return res.send(rs);
};