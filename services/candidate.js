const Candidate = require('../models/Candidate');
const User = require('../models/User');
const Career = require('../models/Career');
const Location = require('../models/Location');
const JobSubmitted = require('../models/JobSubmitted');
const candidateLocation = require('../services/candidateLocation');
const candidateCareer = require('../services/candidateCareer');
const AppError = require('../utils/AppError');
const sequelize = require('../configs/database');
const { QueryTypes } = require('sequelize');

exports.getCandidates = async ({ career, location }) => {
  try {
    let includeArr = [];
    
    let query = {
      include: includeArr,
      limit: 20,
    };

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
      Candidate.findAll({ order: [['id', 'DESC']], ...query }),
      Candidate.count(query),
    ]);

    return { rs, count };
  } catch (error) {
    throw error;
  }
};

exports.getCandidateNew = async () => {
  try {
    const rs = await Candidate.findAll({limit: 5});
    return rs;
  } catch (error) {
    throw error;
  }
};

exports.postCreateCandidate = async (candidateBody, { careerId, locationId }) => {
  try {
    if (locationId === 'null' || locationId === 'undefined') {
      throw new AppError('Chưa chọn địa điểm', 422); 
    }

    if (careerId === 'null' || careerId === 'undefined') {
      throw new AppError('Chưa chọn ngành nghề', 422); 
    }

    const newCandidate = await Candidate.create(candidateBody);
    
    await Promise.all([
      candidateLocation.createCandidateLocation(newCandidate, locationId),
      candidateCareer.createCandidateCareer(newCandidate, careerId),
    ]);

    return true;
  } catch (error) {
    throw error;
  }
};

exports.postUpdateCandidate = async (candidateBody, { careerId, locationId, candidateId }) => {
  try {
    if (locationId === 'null' || locationId === 'undefined') {
      throw new AppError('Chưa chọn địa điểm', 422); 
    }

    if (careerId === 'null' || careerId === 'undefined') {
      throw new AppError('Chưa chọn ngành nghề', 422); 
    }

    await Promise.all([
      Candidate.update(candidateBody, { where: { id: candidateId } }),
      candidateLocation.updateCandidateLocation(candidateId, locationId),
      candidateCareer.updateCandidateCareer(candidateId, careerId),
    ]);

    return true;
  } catch (error) {
    throw error;
  }
};

exports.detailCandidate = async (id) => {
  try {
    const rs = await Candidate.findOne(
      { 
        where: { id },
        include: [
          { model: User },
        ],
      }
    );
    
    if (!rs) throw new AppError('Ứng viên không tồn tại', 422);

    return rs;
  } catch (err) {
    throw err;
  }
};

exports.getCandidateAcc = async (id) => {
  try {
    const rs = await Candidate.findOne({ where: { userId: id } });
    
    if (!rs) throw new AppError('Ứng viên không tồn tại', 422);

    return rs;
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

exports.postUpdateAvatar = async ({ candidateId }, files) => {
  try {
    const getDetail = await Candidate.findByPk(candidateId);
    
    if (!getDetail) throw new AppError('Ứng viên không tồn tại', 422);
    
    let imgPath;
    if (files) {
      const fileUpload = files.image;
      imgPath = `public/uploads/${fileUpload.name}`;
      fileUpload.mv(imgPath);
    }else{
      imgPath = getDetail.image;
    }
  
    const candidateBody = { image: imgPath };
  
    await Candidate.update(candidateBody, { where: { id: candidateId } });
  
    return true;
  } catch (error) {
    throw error;
  }
};

exports.listJobSubmitted = async (params, { user }) => {
  try {
    let perPage = 10;
    let page = params.page || 1;
    let skip = (page * perPage) - perPage;

    let where = `WHERE 1 = 1 AND c.userId = '${user.id}'`,
        pagi = '',
        regexKeyword = '.',
        keyword = params.name;

    if (keyword) {
      regexKeyword = keyword.toLowerCase();
      where = `${where} AND (e.companyName REGEXP '${regexKeyword}'
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

    const [ rs, [{ count }] ] = await Promise.all([
      sequelize.query(
        `
        SELECT
          js.id,
          e.companyName,
          j.name AS 'jobName',
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