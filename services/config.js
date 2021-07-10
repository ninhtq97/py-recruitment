const Config = require('../models/Config');
const Employer = require('../models/Employer');
const { STATUS } = require('../constants/status');
const AppError = require('../utils/AppError');

exports.postCountView = async ({ countView, configId }) => {
  try {
    if (!countView) throw new AppError('Lượt xem hồ sơ ứng viên không được để trống', 422);
  
    const config = Config.findOne({ where: { id: configId }});
    if (!config) throw new AppError('Không tồn tại bản ghi nào', 422);

    await Promise.all([
      Config.update({ countView }, { where: { id: configId } }),
      Employer.update({ countView }, { where: { isActive: STATUS.ACTIVE } }),
    ]);

    return true;
  } catch (error) {
    throw error;
  }
};

exports.postCountJob = async ({ countJob, configId }) => {
  try {
    if (!countJob) throw new AppError('Lượt tạo tin tuyển dụng không được để trống', 422);
  
    const config = Config.findOne({ where: { id: configId }});
    if (!config) throw new AppError('Không tồn tại bản ghi nào', 422);

    await Promise.all([
      Config.update({ countJob }, { where: { id: configId } }),
      Employer.update({ countJob }, { where: { isActive: STATUS.ACTIVE } }),
    ]);

    return true;
  } catch (error) {
    throw error;
  }
};

exports.getConfig = async () => {
  try {
    const data = await Config.findOne();

    return data;
  } catch (error) {
    throw error;
  }
}