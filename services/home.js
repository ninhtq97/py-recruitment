const User = require('../models/User');

exports.getUser = async (user) => {
  try {
    const getUser = await User.findByPk(user.id);
    return getUser;
  } catch (error) {
    throw error;
  }
};
