const { Router } = require('express');

const route = Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware');
const configController = require('../controllers/config');
const { checkAdmin } = require('../middlewares/checkLogin');

module.exports = (app) => {
  app.use('/config', route);

  /**
   * @route   /config
   * @desc    Admin: postCountView, postCountJob Config
   * @access  Private
   */
  route.post(
    '/countView',
    checkAdmin,
    asyncMiddleware(configController.postCountView),
  );

  route.post(
    '/countJob',
    checkAdmin,
    asyncMiddleware(configController.postCountJob),
  );
  
};
