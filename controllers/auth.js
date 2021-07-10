const authService = require('../services/auth');
const { ROLE } = require('../constants/role');

exports.candidateRegister = async (req, res) => {
  const { user } = req.session;
  return res.render('parts/registerCandidate', {
    user,
  });
};

exports.postCandidateRegister = async (req, res) => {
  const { body } = req;

  console.log('Body:', body);

  const data = await authService.postCandidateRegister(body);

  return res.json(data);
};

exports.employerRegister = async (req, res) => {
  const { user } = req.session;
  return res.render('parts/registerEmployer', {
    user,
  });
};

exports.postEmployerRegister = async (req, res) => {
  const { body } = req;

  console.log('Body:', body);

  const data = await authService.postEmployerRegister(body);

  return res.json(data);
};

exports.getAdminLogin = (req, res) => {
  const role = ROLE.ADMIN;
  return res.render('parts/adminLogin', { role });
};

exports.getEmployerLogin = (req, res) => {
  const role = ROLE.EMPLOYER;
  return res.render('parts/employerLogin', { role });
};

// exports.getCandidateLogin = (req, res) => {
//   const role = ROLE.CANDIDATE;
//   return res.render('parts/candidateLogin', { role });
// };

exports.postLogin = async (req, res) => {
  const { body } = req;

  console.log('Body:', body);

  const data = await authService.postLogin(req, body);
  return res.send(data);
};

exports.logout = async (req, res, next) => {
  try {
    const { user } = req.session;
    const { nodeMvc } = req.cookies;

    if (user && nodeMvc) {
      res.clearCookie('nodeMvc');
      if (user.role == ROLE.ADMIN) res.redirect('/auth/admin-login');
      if (user.role == ROLE.CANDIDATE) res.redirect('/');
      if (user.role == ROLE.EMPLOYER) res.redirect('/auth/employer-login');
    } else {
      if (user.role == ROLE.ADMIN) res.redirect('/auth/admin-login');
      if (user.role == ROLE.CANDIDATE) res.redirect('/');
      if (user.role == ROLE.EMPLOYER) res.redirect('/auth/employer-login');
    }
  } catch (error) {
    throw error;
  }
};