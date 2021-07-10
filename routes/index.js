const { Router } = require('express');

const auth = require('./auth');
const home = require('./home');
const candidate = require('./candidate');
const employer = require('./employer');
const job = require('./job');
const hotJobs = require('./hotJobs');
const dashboard = require('./dashboard');
const config = require('./config');

module.exports = () => {
  const app = Router();

  auth(app);
  home(app);
  candidate(app);
  employer(app);
  job(app);
  hotJobs(app);
  dashboard(app);
  config(app)
  
  return app;
};
