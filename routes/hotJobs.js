const { Router } = require('express');

const route = Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware');
const jobController = require('../controllers/job');

module.exports = (app) => {
  app.use('/hot-jobs', route);

  route.get(
    '/',
    asyncMiddleware(jobController.getHotJobs),
  );
  
};
