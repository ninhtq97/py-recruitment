const { Router } = require('express');

const route = Router();

const asyncMiddleware = require('../middlewares/asyncMiddleware');
const authController = require('../controllers/auth');

module.exports = (app) => {
  app.use('/auth', route);

  route.get(
    '/register/candidate',
    asyncMiddleware(authController.candidateRegister),
  );

  route.post(
    '/register/candidate',
   asyncMiddleware(authController.postCandidateRegister),
  );

  route.get(
    '/register/employer',
    asyncMiddleware(authController.employerRegister),
  );

  route.post(
    '/register/employer',
   asyncMiddleware(authController.postEmployerRegister),
  );

  route.get(
    '/admin-login',
    asyncMiddleware(authController.getAdminLogin),
  );

  route.post(
    '/admin-login',
    asyncMiddleware(authController.postLogin),
  );

  route.get(
    '/employer-login',
    asyncMiddleware(authController.getEmployerLogin),
  );

  route.post(
    '/employer-login',
    asyncMiddleware(authController.postLogin),
  );

  // route.get(
  //   '/candidate-login',
  //   asyncMiddleware(authController.getCandidateLogin),
  // );

  route.post(
    '/candidate-login',
    asyncMiddleware(authController.postLogin),
  );

  route.get(
    '/logout',
    asyncMiddleware(authController.logout),
  );
};
