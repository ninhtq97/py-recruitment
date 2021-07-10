const { ROLE } = require('../constants/role');
const Logger = require('../loaders/logger');
const User = require('../models/User');

const createAdmin = async () => {
  const user = new User({
    name: 'pythonvn',
    email: `pythonvietnam@gmail.com`,
    password: '12345678',
    role: ROLE.ADMIN,
  });

  try {
    await user.save();
    Logger.info('Init Admin done!');
  } catch (error) {
    throw error;
  }
};

const initAdmin = async () => {
  try {
    const newAdmin = await User.findOne({ where: { role: ROLE.ADMIN } });

    if (!newAdmin) {
      try {
        createAdmin();
      } catch (error) {
        Logger.error(` Init Admin: ${error.message}`);
      }
    }
  } catch (error) {
    Logger.error(` Init Admin: ${error.message}`);
  }
};

module.exports = { initAdmin };
``