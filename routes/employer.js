const { Router } = require('express');

const route = Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware');
const employerController = require('../controllers/employer');

module.exports = (app) => {
  app.use('/employer', route);

  route.get(
    '/',
    asyncMiddleware(employerController.getEmployers),
  );
};
