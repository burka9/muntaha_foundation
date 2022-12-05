import 'dotenv/config'
import { Sequelize } from 'sequelize'
import { logger } from '../logger'
import { initUser } from './models/user'


const sequelize = new Sequelize({
	dialect: 'mysql',
	host: process.env.DB_HOST,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	logging: log => logger.info(log)
})


export function initDatabase() {
	sequelize.authenticate()
		.then(() => {
			logger.info('database connected')
		})
		.catch(err => {
			logger.error(err)
		})

	initUser(sequelize)

	sequelize.sync()
		.then(() => {
			logger.info(`user table created!`)
		})
		.catch(err => {
			logger.error(`error creating user table.`)
		})
}