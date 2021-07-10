// const timeSet = 86400000 //1 day
// const timeSet = 21600000 //6 hour
const timeSet = 600000 //10 minutes
const connectDb = require('../loaders/sequelize');
const ViewCount = require('../models/ViewCount')
const JobCount = require('../models/JobCount')

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
			await this.viewCount();
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
	async viewCount() {
		let time = new Date()
		const firstTime = time.setHours(23, 50, 00);
		time.setHours(0, 10, 0);
		let lastTime = time.setDate(time.getDate() + 1);
		if (firstTime < new Date().getTime() && new Date().getTime() < lastTime) {
			ViewCount.destroy({
				where: {},
				truncate: true
			})
			JobCount.destroy({
				where: {},
				truncate: true
			})
		}

		console.log(`The trasaction view count has be completed, the next process will be start after ${timeSet / 60 / 1000} minutes`);
		return setTimeout(() => {
			this.viewCount();
		}, timeSet);
	}
}