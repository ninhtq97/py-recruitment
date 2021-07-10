const { Router } = require('express');

const route = Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware');
const candidateController = require('../controllers/candidate');
const { checkCandidate, checkAdminOrEmployer } = require('../middlewares/checkLogin');

module.exports = (app) => {
  app.use('/candidates', route);

  // route.get(
  //   '/',
  //   asyncMiddleware(candidateController.allCandidate),
  // );

  route.get(
    '/:candidateId',
    checkAdminOrEmployer,
    asyncMiddleware(candidateController.detailCandidate),
  );

  route.get(
    '/dashboard/update-profile',
    checkCandidate,
    asyncMiddleware(candidateController.getUpdateProfile),
  );

  route.get(
    '/dashboard/job-submitted',
    checkCandidate,
    asyncMiddleware(candidateController.getJobSubmitted),
  );

  route.post(
    '/dashboard/job-submitted/delete/:jobSubmittedId',
    checkCandidate,
    asyncMiddleware(candidateController.deleteJobSubmitted),
  );

  route.post(
    '/dashboard/update-profile',
    checkCandidate,
    asyncMiddleware(candidateController.postUpdateProfile),
  );

  route.post(
    '/dashboard/update-profile/updateAvatar',
    checkCandidate,
    asyncMiddleware(candidateController.postUpdateAvatar),
  );
};
