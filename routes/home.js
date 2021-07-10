const { Router } = require('express');

const route = Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware');
const homeController = require('../controllers/home');

module.exports = (app) => {
  app.use('/', route);

  route.get(
    '/',
    asyncMiddleware(homeController.index),
  );
};
