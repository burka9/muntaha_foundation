import 'dotenv/config'
import { Sequelize } from 'sequelize'
import { logger } from '../logger'
import { initUserLog } from './log'
import { initUser } from './user'


const sequelize = new Sequelize({
	dialect: 'mysql',
	host: process.env.DB_HOST,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	logging: log => logger.info(log)
})


// function initDefaultUsers(): Promise<void> {}


export function initDatabase() {
	sequelize.authenticate()
		.then(() => {
			logger.info('database connected')
		})
		.catch(err => {
			logger.error(err)
		})

	initUser(sequelize)
	initUserLog(sequelize)

	sequelize.sync({ force: true })
		.then(() => {
			logger.info(`user table created!`)
			// return initDefaultUsers()
		})
		.then(() => {
			logger.info('default users created')
		})
		.catch(err => {
			logger.error(`error creating user table.`)
		})
}