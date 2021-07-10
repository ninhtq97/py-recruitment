const Employer = require('../models/Employer');
const Candidate = require('../models/Candidate');
const Job = require('../models/Job');
const Location = require('../models/Location');
const Career = require('../models/Career');
const Sequelize = require('sequelize');
const User = require('../models/User');
const sequelize = require('../configs/database');
const Op = Sequelize.Op;
const authService = require('../services/auth');
const candidateService = require('./candidate');
const jobService = require('./job');
const employerService = require('./employer');
const { QueryTypes } = require('sequelize');
const JobSubmitted = require('../models/JobSubmitted');
const { ROLE } = require('../constants/role');
const jocCountService = require('./jobCount');

// Employer
exports.listEmployer = async (params) => {
  try {
    let perPage = 10;
    let page = params.page || 1;
    let skip = (page * perPage) - perPage;

    let query = {
      offset: skip,
      limit: perPage,
    };

    if (params.companyName) {
      query.where = { companyName: { [Op.like]: `%${params.companyName}%` } };
    }

    const [rs, count] = await Promise.all([
      Employer.findAll({ order: [['id', 'DESC']], ...query }),
      Employer.count(query)
    ]);

    return { rs, count };
  } catch (err) {
    throw err;
  }
};

exports.createEmployer = async (
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

exports.editEmployer = async (
  {
    employerId,
    companyName,
    code,
    dateRange,
    issuedBy,
    address,
    phone,
    countView,
    isActive,
    countJob,
  },
  files
) => {
  const getDetail = await Employer.findOne({ where: { id: employerId } });
  let imgPath;
  if (files) {
    const fileUpload = files.image;
    imgPath = `public/uploads/${fileUpload.name}`;
    fileUpload.mv(imgPath);
  } else {
    imgPath = getDetail.image;
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
      countView,
      isActive,
      countJob,
    },
    { where: { id: employerId } },
  );
  return true;
};

exports.deleteEmployer = async (id) => {
  try {
    const employer = await Employer.findByPk(id);

    await User.destroy({ where: { id: employer.userId } });
    return true;
  } catch (err) {
    throw err;
  }
};

// Candidate
exports.listCandidate = async (params) => {
  try {
    let perPage = 10;
    let page = params.page || 1;
    let skip = (page * perPage) - perPage;

    let query = {
      offset: skip,
      limit: perPage,
    };

    if (params.name) {
      query.where = { name: { [Op.like]: `%${params.name}%` } };
    }

    const [rs, count] = await Promise.all([
      Candidate.findAll({ order: [['id', 'DESC']], ...query }),
      Candidate.count(query)
    ]);

    return { rs, count };
  } catch (err) {
    throw err;
  }
};

exports.createCandidate = async (
  {
    email,
    password,
    name,
    phone,
    birthday,
    address,
    gender,
    maritalStatus,
    level,
    experience,
    position,
    salary,
    careerGoals,
    skill,
    careerId,
    locationId,
  },
  files,
) => {
  const user = await authService.register({ email, password, role: ROLE.CANDIDATE });

  let imgPath;
  if (files) {
    const fileUpload = files.image;
    imgPath = `public/uploads/${fileUpload.name}`;
    fileUpload.mv(imgPath);
  }

  const candidateBody = {
    name,
    image: imgPath,
    phone,
    birthday,
    address,
    gender,
    maritalStatus,
    level,
    experience,
    position,
    salary,
    careerGoals,
    skill,
    userId: user.id,
  };

  await candidateService.postCreateCandidate(candidateBody, { careerId, locationId });

  return true;
};

exports.editCandidate = async (
  {
    candidateId,
    name,
    phone,
    birthday,
    address,
    gender,
    maritalStatus,
    level,
    experience,
    position,
    salary,
    careerGoals,
    skill,
    careerId,
    locationId,
  },
  files,
) => {
  const getDetail = await candidateService.detailCandidate(candidateId);
  let imgPath;
  if (files) {
    const fileUpload = files.image;
    imgPath = `public/uploads/${fileUpload.name}`;
    fileUpload.mv(imgPath);
  } else {
    imgPath = getDetail.image;
  }

  const candidateBody = {
    name,
    image: imgPath,
    phone,
    birthday,
    address,
    gender,
    maritalStatus,
    level,
    experience,
    position,
    salary,
    careerGoals,
    skill,
  };

  await candidateService.postUpdateCandidate(candidateBody, { careerId, locationId, candidateId });

  return true;
};

exports.deleteCandidate = async (id) => {
  try {
    const candidate = await Candidate.findByPk(id);

    await User.destroy({ where: { id: candidate.userId } });
    return true;
  } catch (err) {
    throw err;
  }
};

// Location
exports.listLocation = async (params) => {
  try {
    let perPage = 10;
    let page = params.page || 1;
    let skip = (page * perPage) - perPage;

    let query = {
      offset: skip,
      limit: perPage,
    };

    if (params.name) {
      query.where = { name: { [Op.like]: `%${params.name}%` } };
    }

    const [rs, count] = await Promise.all([
      Location.findAll({ order: [['id', 'DESC']], ...query }),
      Location.count(query)
    ]);

    return { rs, count };
  } catch (err) {
    throw err;
  }
};

exports.createLocation = async (
  {
    name,
  },
  files
) => {
  try {
    let imgPath;
    if (files) {
      const fileUpload = files.image;
      imgPath = `public/uploads/${fileUpload.name}`;
      fileUpload.mv(imgPath);
    }

    const location = await Location.findOne({ where: { name } });
    if (location) return 'Địa điểm này đã tồn tại';

    await Location.create({
      name,
      image: imgPath,
    });

    return true;
  } catch (err) {
    throw err;
  }
};

exports.editLocation = async (
  {
    locationId,
    name,
  },
  files
) => {
  const getDetail = await Location.findOne({ where: { id: locationId } });
  let imgPath;
  if (files) {
    const fileUpload = files.image;
    imgPath = `public/uploads/${fileUpload.name}`;
    fileUpload.mv(imgPath);
  } else {
    imgPath = getDetail.image;
  }

  const location = await Location.findOne({ where: { name } });
  if (location && location.id !== locationId) return 'Địa điểm này đã tồn tại';

  await Location.update(
    {
      name,
      image: imgPath,
    },
    { where: { id: locationId } },
  );
  return true;
};

exports.deleteLocation = async (id) => {
  try {
    await Location.destroy({ where: { id } });
    return true;
  } catch (err) {
    throw err;
  }
};

// Career
exports.listCareer = async (params) => {
  try {
    let perPage = 10;
    let page = params.page || 1;
    let skip = (page * perPage) - perPage;

    let query = {
      offset: skip,
      limit: perPage,
    };

    if (params.name) {
      query.where = { name: { [Op.like]: `%${params.name}%` } };
    }

    const [rs, count] = await Promise.all([
      Career.findAll({ order: [['id', 'DESC']], ...query }),
      Career.count(query)
    ]);

    return { rs, count };
  } catch (err) {
    throw err;
  }
};

exports.createCareer = async (
  {
    name,
  },
) => {
  try {
    const career = await Career.findOne({ where: { name } });
    if (career) return 'Ngành nghề này đã tồn tại';

    await Career.create({
      name,
    });

    return true;
  } catch (err) {
    throw err;
  }
};

exports.editCareer = async (
  {
    careerId,
    name,
  },
) => {
  const career = await Career.findOne({ where: { name } });
  if (career && career.id !== careerId) return 'Ngành nghề này đã tồn tại';

  await Career.update(
    {
      name,
    },
    { where: { id: careerId } },
  );
  return true;
};

exports.deleteCareer = async (id) => {
  try {
    await Career.destroy({ where: { id } });
    return true;
  } catch (err) {
    throw err;
  }
};

// JobSubmitted
exports.listJobSubmittedAdmin = async (params) => {
  try {
    let perPage = 10;
    let page = params.page || 1;
    let skip = (page * perPage) - perPage;

    let where = 'WHERE 1 = 1',
      pagi = '',
      regexKeyword = '.',
      keyword = params.name;

    if (keyword) {
      regexKeyword = keyword.toLowerCase();
      where = `${where} AND (c.name REGEXP '${regexKeyword}'
                        OR j.name REGEXP '${regexKeyword}')`;
    }

    if (perPage) {
      pagi = `
        LIMIT ${perPage}
        OFFSET ${skip};
      `
    }

    let order = `ORDER BY js.createdAt DESC`;
    let from = `
      FROM job_submitteds js
      LEFT JOIN jobs j ON j.id = js.jobId
      LEFT JOIN candidates c ON c.id = js.candidateId
      LEFT JOIN employers e ON e.id = j.employerId
    `;

    const [rs, [{ count }]] = await Promise.all([
      sequelize.query(
        `
        SELECT
          js.id,
          c.id AS 'candidateId',
          c.name AS 'candidateName',
          j.name AS 'jobName',
          e.companyName,
          js.createdAt,
          j.expirationDate
        ${from}
        ${where}
        ${order}
        ${pagi}
        `,
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      ),
      sequelize.query(
        `
        SELECT
          count(*) as count
        ${from}
        ${where}
        `,
        { type: QueryTypes.SELECT }
      ),
    ]);

    return { rs, count };
  } catch (err) {
    throw err;
  }
};

exports.listJobSubmittedEmployer = async (params, { user }) => {
  try {
    let perPage = 10;
    let page = params.page || 1;
    let skip = (page * perPage) - perPage;

    let where = `WHERE 1 = 1 AND e.userId = '${user.id}'`,
      pagi = '',
      regexKeyword = '.',
      keyword = params.name;

    if (keyword) {
      regexKeyword = keyword.toLowerCase();
      where = `${where} AND (c.name REGEXP '${regexKeyword}'
                        OR j.name REGEXP '${regexKeyword}')`;
    }

    if (perPage) {
      pagi = `
        LIMIT ${perPage}
        OFFSET ${skip};
      `
    }

    let order = `ORDER BY js.createdAt DESC`;
    let from = `
      FROM job_submitteds js
      LEFT JOIN jobs j ON j.id = js.jobId
      LEFT JOIN candidates c ON c.id = js.candidateId
      LEFT JOIN employers e ON e.id = j.employerId
    `;

    const [rs, [{ count }]] = await Promise.all([
      sequelize.query(
        `
        SELECT
          js.id,
          c.id AS 'candidateId',
          c.name AS 'candidateName',
          j.name AS 'jobName',
          js.createdAt,
          j.expirationDate
        ${from}
        ${where}
        ${order}
        ${pagi}
        `,
        {
          type: QueryTypes.SELECT,
          nest: true,
        }
      ),
      sequelize.query(
        `
        SELECT
          count(*) as count
        ${from}
        ${where}
        `,
        { type: QueryTypes.SELECT }
      ),
    ]);

    return { rs, count };
  } catch (err) {
    throw err;
  }
};

exports.deleteJobSubmitted = async (id) => {
  try {
    await JobSubmitted.destroy({ where: { id } });
    return true;
  } catch (err) {
    throw err;
  }
};

// Job
exports.listJob = async (params, user) => {
  try {
    let perPage = 10;
    let page = params.page || 1;
    let skip = (page * perPage) - perPage;

    let query = {
      offset: skip,
      limit: perPage,
    };

    const getEmployer = await Employer.findOne({ where: { userId: user.id } });

    if (getEmployer) {
      query.where = { employerId: getEmployer.id };
    }

    if (params.name) {
      query.where = {
        ...query.where,
        name: { [Op.like]: `%${params.name}%` }
      }
    }

    const [rs, count] = await Promise.all([
      Job.findAll({ order: [['id', 'DESC']], ...query }),
      Job.count(query)
    ]);

    return { rs, count };
  } catch (err) {
    throw err;
  }
};

exports.createJob = async (
  {
    name,
    careerId,
    locationId,
    quantity,
    position,
    workFormat,
    gender,
    experience,
    salary,
    expirationDate,
    describe,
    requestJob,
    benefitsEnjoyed,
  },
  user
) => {
  const [employCode, getEmployer] = await Promise.all([
    jobService.checkEmployCode(),
    employerService.getEmployerUserId(user.id),
  ]);
  const jobBody = {
    name,
    quantity,
    position,
    workFormat,
    gender,
    experience,
    salary,
    expirationDate,
    describe,
    requestJob,
    benefitsEnjoyed,
    employCode,
    employerId: getEmployer.id,
  };

 const job =  await jobService.postCreateJob(jobBody, { careerId, locationId });
 await jocCountService.postCountJob({ employerId: getEmployer.id, jobId: job.id })
  return true;
};

exports.editJob = async (
  {
    jobId,
    name,
    careerId,
    locationId,
    quantity,
    position,
    workFormat,
    gender,
    experience,
    salary,
    expirationDate,
    describe,
    requestJob,
    benefitsEnjoyed,
  },
) => {
  await jobService.detailJob(jobId);

  const jobBody = {
    name,
    careerId,
    locationId,
    quantity,
    position,
    workFormat,
    gender,
    experience,
    salary,
    expirationDate,
    describe,
    requestJob,
    benefitsEnjoyed,
  };

  await jobService.postUpdateJob(jobBody, { careerId, locationId, jobId });

  return true;
};

exports.deleteJob = async (id) => {
  try {
    await Job.destroy({ where: { id } });
    return true;
  } catch (err) {
    throw err;
  }
};