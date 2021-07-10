const validator = require('validator');
const User = require('../models/User');
const Candidate = require('../models/Candidate');
const Employer = require('../models/Employer');
const { compare } = require('bcryptjs');
const AppError = require('../utils/AppError');
const { ROLE } = require('../constants/role');
const { STATUS } = require('../constants/status');
const authService = require('../services/auth');

exports.register = async ({ email, password, role }) => {
  try {
    if (!validator.isEmail(email)) throw new AppError('Email không hợp lệ', 422);
  
    if (password.length < 6) throw new AppError('Mật khẩu phải ít nhất 6 kí tự', 422);

    const existingUser = await User.findOne({ where: { email } });
  
    if (existingUser) throw new AppError('Người dùng đã tồn tại', 422);

    const user = await User.create({
      email,
      password,
      role,
    });

    return user;
  } catch (error) {
    throw error;
  }
};

exports.postCandidateRegister = async (
  {
    email,
    password,
    name,
    phone,
  },
) => {
  const user = await authService.register({ email, password, role: ROLE.CANDIDATE });

  await Candidate.create({
    name,
    phone,
    userId: user.id,
  });

  return true;
};

exports.postEmployerRegister = async (
  {
    email,
    password,
    companyName,
    code,
    dateRange,
    issuedBy,
    address,
    phone,
  },
) => {
  const user = await authService.register({ email, password, role: ROLE.EMPLOYER });

  await Employer.create({
    companyName,
    code,
    dateRange,
    issuedBy,
    address,
    phone,
    userId: user.id,
  });

  return true;
};

exports.postLogin = async (req, { email, password, role }) => {
  try {
    let isLocked = false;

    const user = await User.findOne({ where: { email, role } });
    if (!user) throw new AppError('Tài khoản không đúng', 422);
    const isTruePassword = await compare(password,  user.password);
    if (!isTruePassword) throw new AppError('Mật khẩu không đúng', 422);

    if (role === ROLE.EMPLOYER) {
      const employer = await Employer.findOne({ include: { model: User, where: { email, role } } });
      if (employer.isActive === STATUS.LOCK) isLocked = true;
    }
    if (isLocked) throw new AppError('Tài khoản của bạn đã bị khóa', 422);

    req.session.user = user;

    return true;
  } catch (error) {
    throw error;
  }
};