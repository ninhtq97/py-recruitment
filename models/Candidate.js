const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const Candidate = sequelize.define(
  'candidate',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    // Mã hồ sơ
    profileCode: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
    },

    // Tên
    name: {
      type: Sequelize.STRING
    },

    // Ảnh đại diện
    image: {
      type: Sequelize.STRING,
    },

    // Số điện thoại
    phone: {
      type: Sequelize.STRING,
    },

    // Ngày sinh
    birthday: {
      type: Sequelize.DATE,
    },

    // Địa chỉ
    address: {
      type: Sequelize.STRING,
    },

    // Giới tính
    gender: {
      type: Sequelize.ENUM('1', '2'), // 1: male / 2: female
      defaultValue: '1',
    },

    // Tình trạng hôn nhân
    maritalStatus: {
      type: Sequelize.ENUM('1', '2'), // 1: alone / 2: married
      defaultValue: '1',
    },

    //Trinh do hoc van
    level: {
      type: Sequelize.STRING
    },

    //Só năm kinh nghiệm
    experience: {
      type: Sequelize.STRING
    },

    //Cáp bậc mong muốn
    position: {
      type: Sequelize.STRING
    },
    
    //Mức lương mong muốn
    salary: {
      type: Sequelize.STRING
    },

    //Mục tiêu nghề nghiệp
    careerGoals: {
      type: Sequelize.TEXT
    },
    
    //Kĩ năng bản thân
    skill: {
      type: Sequelize.TEXT
    },
  }
);

module.exports = Candidate;
