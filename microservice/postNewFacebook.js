// const timeSet = 86400000 //1 day
const timeSet = 21600000 //6 hour
// const timeSet = 60000 //1 minutes
const connectDb = require('../loaders/sequelize');
const Job = require('../models/Job')
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
  path: path.resolve(__dirname, `../env/.env`),
});
module.exports = {
  async startProcess() {
    connectDb()
    try {
      await this.postNewFacebook();
    }
    catch (error) {
      const time = 50000 // 5 minutes;
      console.log(`Cron Process has an error ! The next process will be start after ${time / 1000} seconds`);
      console.log(error)
      setTimeout(() => {
        this.startProcess();
      }, time);
    }
  },
  async postNewFacebook() {
    console.log('The post new process start')
    let job = await Job.findAll({ where: { isPostFacebook: 0 } })
    for (let i = 0; i < job.length; i++) {
      const config = {
        method: 'post',
        url: `https://graph.facebook.com/${process.env.ID_PAGE_FACEBOOK}/feed?link=${process.env.CLIENT}/jobs/${job[i].dataValues.id}/&access_token=${process.env.ACCESS_TOKEN}`,
        headers: { 'User-Agent': 'Axios - console app' }
      }
      let res = await axios(config)
      await Job.update({ isPostFacebook: 1 }, { where: { id: job[i].dataValues.id } });
    }
    console.log(`The trasaction post new has be completed, the next process will be start after ${timeSet / 60 / 1000} minutes`);
    return setTimeout(() => {
      this.postNewFacebook();
    }, timeSet);
  }
}