const { Router } = require('express');

const route = Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware');
const jobController = require('../controllers/job');

module.exports = (app) => {
  app.use('/jobs', route);
  
  route.get(
    '/:jobId',
    asyncMiddleware(jobController.detailJob),
  );

  route.get(
    '/',
    asyncMiddleware(jobController.getJobs),
  );

  route.post(
    '/submit/:jobId',
    asyncMiddleware(jobController.postJobSubmit),
  );
};
