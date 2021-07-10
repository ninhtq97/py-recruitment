const Employer = require('../models/Employer');
const Job = require('../models/Job');
const AppError = require('../utils/AppError');
const {TYPE} = require('../constants/jobs');
const Sequelize = require('sequelize');
const Career = require('../models/Career');
const Location = require('../models/Location');
const JobSubmitted = require('../models/JobSubmitted');
const Candidate = require('../models/Candidate');
const Op = Sequelize.Op;
const { makeRandomNumber } = require('../utils/generate');
const jobLocation = require('../services/jobLocation');
const jobCareer = require('../services/jobCareer');

exports.findAll = async () => {
  try {
    const job = await Job.findAll();
    return job;
  } catch (error) {
    throw error;
  };
};

exports.findJobNew = async () => {
  try {
    const jobUrgent = await Job.findAll({
      include: {
        model: Employer,
      },
      limit: 5,
    });
    return jobUrgent;
  } catch (error) {
    throw error;
  }
};

exports.findJobUrgent = async () => {
  try {
    const jobUrgent = await Job.findAll({
      where: { 
        type: TYPE.URGENT,
      },
      include: 
      {
        model: Employer,
      },
    });
    return jobUrgent
  } catch (error) {
    throw error;
  }
};

exports.findJobAttractive = async () => {
  try {
    const jobUrgent = await Job.findAll({
      where: { 
        type: TYPE.ATTRACTIVE,
      },
      include: {
        model: Employer,
      },
    });
    return jobUrgent;
  } catch (error) {
    throw error;
  }
}

exports.findJobHighSalary = async () => {
  try {
    const jobUrgent = await Job.findAll({
      where: { 
        type: TYPE.HIGH_SALARY,
      },
      include: {
        model: Employer,
      },
    });
    return jobUrgent;
  } catch (error) {
    throw error;
  }
}

exports.detailJob = async (id) => {
  try {
    const rs = await Job.findOne(
      { 
        where: { id },
        include: [
          { model: Employer },
        ],
      }
    );
    
    if (!rs) throw new AppError('Công việc không tồn tại', 422);

    return rs;
  } catch (err) {
    throw err;
  }
};

exports.employerJob = async () => {
  try {
    const rs = await Job.findAll({
      include: {
        model: Employer,
      },
      limit: 10,
    });

    return rs;
  } catch (error) {
    throw error;
  }
};

exports.getJobsHome = async () => {
  try {
    let includeArr = [
      { model: Employer },
    ];
    
    let query = {
      include: includeArr,
      limit: 18,
    };
    
    const [ rs, count ] = await Promise.all([
      Job.findAll({ order: [['createdAt', 'DESC']], ...query }),
      Job.count(query),
    ]);

    return { rs, count };
  } catch (error) {
    throw error;
  }
};

exports.getJobs = async ({ name, career, location, page }) => {
  try {
    let perPage = 10;
    let pages = page || 1;
    let skip = (pages * perPage) - perPage;

    let includeArr = [
      { model: Employer },
    ];
    
    let query = {
      include: includeArr,
      offset: skip,
      limit: perPage,
    };

    if (name) {
      query.where = { name: { [Op.like]: `%${name}%` } };
    }

    if (career) {
      includeArr.push({ 
        model: Career,
        through: { attributes: [] },
        where: { id: career },
      });
    }

    if (location) {
      includeArr.push({ 
        model: Location,
        through: { attributes: [] },
        where: { id: location },
      });
    }
    
    const [ rs, count ] = await Promise.all([
      Job.findAll({ order: [['createdAt', 'DESC']], ...query }),
      Job.count(query),
    ]);

    return { rs, count };
  } catch (error) {
    throw error;
  }
};

exports.getHotJobsHome = async () => {
  try {
    let includeArr = [
      { model: Employer },
    ];
    
    let query = {
      include: includeArr,
      limit: 18,
    };
    
    const [ rs, count ] = await Promise.all([
      Job.findAll({ order: [['view', 'DESC']], ...query }),
      Job.count(query),
    ]);

    return { rs, count };
  } catch (error) {
    throw error;
  }
};

exports.getHotJobs = async ({ name, career, location }) => {
  try {
    let includeArr = [
      { model: Employer },
    ];
    
    let query = {
      include: includeArr,
      limit: 18,
    };

    if (name) {
      query.where = { name: { [Op.like]: `%${name}%` } };
    }

    if (career) {
      includeArr.push({ 
        model: Career,
        through: { attributes: [] },
        where: { id: career },
      });
    }

    if (location) {
      includeArr.push({ 
        model: Location,
        through: { attributes: [] },
        where: { id: location },
      });
    }
    
    const [ rs, count ] = await Promise.all([
      Job.findAll({ order: [['view', 'DESC']], ...query }),
      Job.count(query),
    ]);

    return { rs, count };
  } catch (error) {
    throw error;
  }
};

exports.postJobSubmit = async ({ jobId }, { user }) => {
  try {
    const [candidate, job] = await Promise.all([
      Candidate.findOne({ where: { userId: user.id } }),
      Job.findByPk(jobId),
    ]);

    if (!candidate) throw new AppError('Ứng viên không tồn tại', 422);
    if (!job) throw new AppError('Công việc không tồn tại', 422);
    
    const jobSubmitted = await JobSubmitted.findOne({
      where: {
        jobId,
        candidateId: candidate.id,
      }
    });
    if (jobSubmitted) throw new AppError('Bạn đã ứng tuyển công việc này', 422);
    
    await JobSubmitted.create({
      jobId,
      candidateId: candidate.id,
    });

    return true;
  } catch (error) {
    throw error;
  }
};

exports.checkEmployCode = async () => {
  try {
    let employCode, rs;

    employCode = makeRandomNumber(6);
    rs = await Job.findOne({ where: { employCode } });
    
    while (rs) {
      employCode = makeRandomNumber(6);
      rs = await Job.findOne({ where: { employCode } });
    }
    
    return employCode;
  } catch (error) {
    throw error;
  }
};

exports.postCreateJob = async (jobBody, { careerId, locationId }) => {
  try {
    if (locationId === 'null' || locationId === 'undefined') {
      throw new AppError('Chưa chọn địa điểm', 422); 
    }

    if (careerId === 'null' || careerId === 'undefined') {
      throw new AppError('Chưa chọn ngành nghề', 422); 
    }
    
    const newJob = await Job.create(jobBody);
    
    await Promise.all([
      jobLocation.createJobLocation(newJob, locationId),
      jobCareer.createJobCareer(newJob, careerId),
    ]);

    return newJob;
  } catch (error) {
    throw error;
  }
};

exports.postUpdateJob = async (jobBody, { careerId, locationId, jobId }) => {
  try {
    if (locationId === 'null' || locationId === 'undefined') {
      throw new AppError('Chưa chọn địa điểm', 422); 
    }

    if (careerId === 'null' || careerId === 'undefined') {
      throw new AppError('Chưa chọn ngành nghề', 422); 
    }

    await Promise.all([
      Job.update(jobBody, { where: { id: jobId } }),
      jobLocation.updateJobLocation(jobId, locationId),
      jobCareer.updateJobCareer(jobId, careerId),
    ]);
    
    return true;
  } catch (error) {
    throw error;
  }
};

exports.plusView = async (id) => {
  try {
    const getJob = await Job.findByPk(id);

    if (!getJob) throw new AppError('Công việc không tồn tại', 422);

    getJob.view += 1;
    
    await getJob.save();

    return true;

  } catch (error) {
    throw error;
  }
};