const { Router } = require('express');

const route = Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware');
const dashboardController = require('../controllers/dashboard');
const { checkAdmin, checkEmployer, checkCandidate } = require('../middlewares/checkLogin');

module.exports = (app) => {
  app.use('/dashboard', route);

  /**
   * @route   /dashboard/admin/employers
   * @desc    Admin: create, edit, delete, active Employer
   * @access  Private
   */
  route.get('/admin/employers', checkAdmin, asyncMiddleware(dashboardController.indexEmployer));

  route.get('/admin/employers/create', checkAdmin, asyncMiddleware(dashboardController.createEmployer));

  route.post('/admin/employers/create', checkAdmin, asyncMiddleware(dashboardController.postCreateEmployer));

  route.get('/admin/employers/:employerId', checkAdmin, asyncMiddleware(dashboardController.editEmployer));

  route.post('/admin/employers/:employerId', checkAdmin, asyncMiddleware(dashboardController.postEditEmployer));

  route.post('/admin/employers/delete/:employerId', checkAdmin, asyncMiddleware(dashboardController.deleteEmployer));

  /**
   * @route   /dashboard/admin/candidates
   * @desc    Admin: create, edit, delete Candidate
   * @access  Private
   */
   route.get('/admin/candidates', checkAdmin, asyncMiddleware(dashboardController.indexCandidate));

   route.get('/admin/candidates/create', checkAdmin, asyncMiddleware(dashboardController.createCandidate));
 
   route.post('/admin/candidates/create', checkAdmin, asyncMiddleware(dashboardController.postCreateCandidate));
 
   route.get('/admin/candidates/:candidateId', checkAdmin, asyncMiddleware(dashboardController.editCandidate));
 
   route.post('/admin/candidates/:candidateId', checkAdmin, asyncMiddleware(dashboardController.postEditCandidate));
 
   route.post('/admin/candidates/delete/:candidateId', checkAdmin, asyncMiddleware(dashboardController.deleteCandidate));

  /**
   * @route   /dashboard/admin/locations
   * @desc    Admin: create, edit, delete Location
   * @access  Private
   */
   route.get('/admin/locations', checkAdmin, asyncMiddleware(dashboardController.indexLocation));

   route.get('/admin/locations/create', checkAdmin, asyncMiddleware(dashboardController.createLocation));
 
   route.post('/admin/locations/create', checkAdmin, asyncMiddleware(dashboardController.postCreateLocation));
 
   route.get('/admin/locations/:locationId', checkAdmin, asyncMiddleware(dashboardController.editLocation));
 
   route.post('/admin/locations/:locationId', checkAdmin, asyncMiddleware(dashboardController.postEditLocation));
 
   route.post('/admin/locations/delete/:locationId', checkAdmin, asyncMiddleware(dashboardController.deleteLocation));

  /**
   * @route   /dashboard/admin/careers
   * @desc    Admin: create, edit, delete Career
   * @access  Private
   */
   route.get('/admin/careers', checkAdmin, asyncMiddleware(dashboardController.indexCareer));

   route.get('/admin/careers/create', checkAdmin, asyncMiddleware(dashboardController.createCareer));
 
   route.post('/admin/careers/create', checkAdmin, asyncMiddleware(dashboardController.postCreateCareer));
 
   route.get('/admin/careers/:careerId', checkAdmin, asyncMiddleware(dashboardController.editCareer));
 
   route.post('/admin/careers/:careerId', checkAdmin, asyncMiddleware(dashboardController.postEditCareer));
 
   route.post('/admin/careers/delete/:careerId', checkAdmin, asyncMiddleware(dashboardController.deleteCareer));

  /**
   * @route   /dashboard/admin/jobSubmits
   * @desc    Admin: list JobSubmitted
   * @access  Private
   */
   route.get('/admin/jobSubmits', checkAdmin, asyncMiddleware(dashboardController.indexJobSubmittedAdmin));
   route.post('/admin/jobSubmits/delete/:jobSubmittedId', checkAdmin, asyncMiddleware(dashboardController.deleteJobSubmitted));


  /**
   * @route   /dashboard/employer/info
   * @desc    Employer: info and update-info
   * @access  Private
   */
   route.get('/employer/info', checkEmployer, asyncMiddleware(dashboardController.infoEmployer));
   route.post('/employer/info', checkEmployer, asyncMiddleware(dashboardController.updateInfoEmployer));

  /**
   * @route   /dashboard/employer/jobSubmits
   * @desc    Employer: list JobSubmitted
   * @access  Private
   */
   route.get('/employer/jobSubmits', checkEmployer, asyncMiddleware(dashboardController.indexJobSubmittedEmployer));
   route.post('/employer/jobSubmits/delete/:jobSubmittedId', checkEmployer, asyncMiddleware(dashboardController.deleteJobSubmitted));

  /**
   * @route   /dashboard/employer/jobs
   * @desc    Employer: create, edit, delete Job
   * @access  Private
   */
   route.get('/employer/jobs', checkEmployer, asyncMiddleware(dashboardController.indexJob));

   route.get('/employer/jobs/create', checkEmployer, asyncMiddleware(dashboardController.createJob));
 
   route.post('/employer/jobs/create', checkEmployer, asyncMiddleware(dashboardController.postCreateJob));
 
   route.get('/employer/jobs/:jobId', checkEmployer, asyncMiddleware(dashboardController.editJob));
 
   route.post('/employer/jobs/:jobId', checkEmployer, asyncMiddleware(dashboardController.postEditJob));
 
   route.post('/employer/jobs/delete/:jobId', checkEmployer, asyncMiddleware(dashboardController.deleteJob));

  /**
   * @route   /dashboard/candidate/update-profile
   * @desc    Candidate: update profile Candidate
   * @access  Private
   */
   route.get('/candidate/update-profile', checkCandidate, asyncMiddleware(dashboardController.getUpdateProfile));
 
   route.post('/candidate/update-profile', checkCandidate, asyncMiddleware(dashboardController.postUpdateProfile));

};
