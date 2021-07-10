const express = require('express');
const fileUpload = require('express-fileupload');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const app = express();
app.use(cookieParser());
app.use(session({
    key: 'nodeMvc',
    secret: 'nodeMvc',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 365
    }
}));
app.use((req, res, next) => {
  if (req.cookies.nodeMvc && !req.session.user) {
      res.clearCookie('nodeMvc');        
  }
  next();
});
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
  path: path.resolve(__dirname, `./env/.env`),
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/'));
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);

// Load API routes
const routes = require('./routes');
app.use('/', routes());

//Logger
const Logger = require('./loaders/logger');

// Listen Server
async function startServer() {
  await require('./loaders')(app);
  const port = process.env.PORT || 7000;
  app.listen(port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }

    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${port} 🛡️ 
      ################################################
    `);
  });
}

startServer();
