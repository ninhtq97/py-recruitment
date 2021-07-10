const Sequelize = require('sequelize');
const sequelize = require('../configs/database');

const Job = sequelize.define(
  'job',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    // Lượt xem
    view: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },

    // Tên
    name: {
      type: Sequelize.STRING
    },

    // Số lượng cần tuyển
    quantity: {
      type: Sequelize.STRING
    },

    // Mã tuyển dụng
    employCode: {
      type: Sequelize.INTEGER
    },

    // Mức lương
    salary: {
      type: Sequelize.STRING,
    },

    // Số năm kinh nghiệm
    experience: {
      type: Sequelize.STRING
    },

    // Trình độ học vấn
    level: {
      type: Sequelize.STRING
    },

    // Hình thức làm việc
    workFormat: {
      type: Sequelize.STRING
    },

    // Giới tính
    gender: {
      type: Sequelize.ENUM('1', '2', '3'), // 1: male / 2: female / 3: not required
      defaultValue: '3',
    },

    // Cấp bậc mong muốn
    position: {
      type: Sequelize.STRING
    },

    // Mô tả công việc
    describe: {
      type: Sequelize.TEXT
    },

    // Quyền lợi được hưởng
    benefitsEnjoyed: {
      type: Sequelize.TEXT
    },

    // Yêu cầu công việc
    requestJob: {
      type: Sequelize.TEXT
    },

    // Yêu cầu hồ sơ
    requestInfo: {
      type: Sequelize.TEXT
    },

    // Loại 1: Tuyển gấp // 2: Hấp dẫn // 3: Lương cao
    type: {
      type: Sequelize.ENUM('1', '2', '3'), // 1: urgent / 2: attractive  / 3: high salary
      defaultValue: '1',
    },

    // Hạn nộp hồ sơ
    expirationDate: {
      type: Sequelize.DATE
    },

    isPostFacebook: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  }
);

module.exports = Job;
