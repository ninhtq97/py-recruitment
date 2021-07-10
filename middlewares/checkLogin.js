const { ROLE } = require('../constants/role');
const { STATUS } = require('../constants/status');
const Employer = require('../models/Employer');
const AppError = require('../utils/AppError');

const checkLock = async ({ userId }) => {
  try {
    const isLock = Employer.findOne({
      where: { userId, isActive: STATUS.LOCK },
    });

    return isLock;
  } catch (error) {
    throw error;
  }
};

exports.checkAdmin = (req, res, next) => {
  const { user } = req.session;
  const { nodeMvc } = req.cookies;

  if (user && nodeMvc) {
    if (user.role != ROLE.ADMIN) {
      res.redirect('/auth/admin-login');
    }
    next();
  } else {
    res.redirect('/auth/admin-login');
  }
};

exports.checkCandidate = (req, res, next) => {
  const { user } = req.session;
  const { nodeMvc } = req.cookies;

  if (user && nodeMvc) {
    if (user.role != ROLE.CANDIDATE) {
      res.redirect('/auth/candidate-login');
    }
    next();
  } else {
    res.redirect('/auth/admin-login');
  }
};

exports.checkEmployer = async (req, res, next) => {
  const { user } = req.session;
  const { nodeMvc } = req.cookies;

  if (user && nodeMvc) {
    const isLocked = await checkLock({ userId: user.id });

    if (user.role != ROLE.EMPLOYER || isLocked) {
      res.redirect('/auth/employer-login');
    }
    next();
  } else {
    res.redirect('/auth/employer-login');
  }
};

exports.checkAdminOrEmployer = async (req, res, next) => {
  const { user } = req.session;
  const { nodeMvc } = req.cookies;

  if (user && nodeMvc) {
    if (user.role != ROLE.EMPLOYER && user.role != ROLE.ADMIN) {
      res.redirect('/');
    }
    next();
  } else {
    res.redirect('/');
  }
};
