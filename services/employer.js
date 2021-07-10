const Employer = require('../models/Employer');
const AppError = require('../utils/AppError');
const employerService = require('./employer');

exports.getEmployers = async () => {
  try {
    const rs = await Employer.findAll();
    return rs;
  } catch (error) {
    throw error;
  }
};

exports.getEmployer = async (id) => {
  try {
    const rs = await Employer.findOne({ where: { id } });

    if (!rs) {
      throw AppError ('Nhà tuyển dụng không tồn tại', 422);
    }

    return rs;
  } catch (error) {
    throw error;
  }
};

exports.getEmployerUserId = async (userId) => {
  try {
    const rs = await Employer.findOne({ where: { userId } });
    
    if (!rs) {
      throw AppError ('Nhà tuyển dụng không tồn tại', 422);
    }
    
    return rs;
  } catch (error) {
    throw error;
  }
};

exports.updateEmployer = async (
  id,
  {
    companyName,
    code,
    dateRange,
    issuedBy,
    address,
    phone,
  },
  files,
) => {
  const employer = await employerService.getEmployerUserId(id);
  let imgPath;
  if (files) {
    const fileUpload = files.image;
    imgPath = `public/uploads/${fileUpload.name}`;
    fileUpload.mv(imgPath);
  } else {
    imgPath = employer.image;
  }
  await Employer.update(
    {
      image: imgPath,
      companyName,
      code,
      dateRange,
      issuedBy,
      address,
      phone,
    },
    { where: { id: employer.id } }, 
  );
  return true;
};