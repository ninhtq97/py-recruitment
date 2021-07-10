const express = require('express');
const cors = require('cors');
const engine = require('ejs-mate');

const Logger = require('./logger');
const { initAdmin } = require('../utils/intAdmin');
const { initConfig } = require('../utils/intConfig');

module.exports = async (app) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  app.enable('trust proxy');

  // use ejs-locals for all ejs templates:
  app.engine('ejs', engine);

  // register view engine
  app.set('view engine', 'ejs');

  // Use JSON, XML, urlencoded
  app.use(express.static('public'));
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: false,
    })
  );

  app.use(cors());

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  await Promise.all([
    initAdmin(),
    initConfig(),
  ]);

  app.use((err, req, res, next) => {
    Logger.error(`🔥 [  ${req.path}  ] : ${err.message} `);

    err.status = err.status || 500;
    err.errorCode = err.errorCode || err.status;

    res.status(err.status).json({
      success: false,
      errorCode: err.errorCode,
      message: err.message,
    });
  });
};
