const Logger = require('../loaders/logger');

const Config = require('../models/Config');

const createConfig = async () => {
  const config = new Config({
    countView: 50,
    countJob: 50,
  });

  try {
    await config.save();
    Logger.info('Init Config done!');
  } catch (error) {
    throw error;
  }
};

const initConfig = async () => {
  try {
    const newConfig = await Config.findOne();

    if (!newConfig) {
      try {
        createConfig();
      } catch (error) {
        Logger.error(` Init Config: ${error.message}`);
      }
    }
  } catch (error) {
    Logger.error(` Init Config: ${error.message}`);
  }
};

module.exports = { initConfig };
``