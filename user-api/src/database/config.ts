import 'dotenv/config'
import { Sequelize } from 'sequelize'
import { logger } from '../logger'
import { initUserLog } from './log'
import { initUser, User } from './user'


const sequelize = new Sequelize({
	dialect: 'mysql',
	host: process.env.DB_HOST,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	logging: log => logger.info(log)
})


async function initDefaultUsers(): Promise<void> {
	try {
		await User.createMany([
			{
				name: process.env.DEFAULT_USER_ADMIN_NAME || '',
				username: process.env.DEFAULT_USER_ADMIN_USERNAME || '',
				password: process.env.DEFAULT_USER_ADMIN_PASSWORD || '',
				user_type: process.env.DEFAULT_USER_ADMIN_TYPE || '',
			},
			{
				name: process.env.DEFAULT_USER_ATTENDANCE_OFFICE_NAME || '',
				username: process.env.DEFAULT_USER_ATTENDANCE_OFFICE_USERNAME || '',
				password: process.env.DEFAULT_USER_ATTENDANCE_OFFICE_PASSWORD || '',
				user_type: process.env.DEFAULT_USER_ATTENDANCE_OFFICE_TYPE || '',
			},
			{
				name: process.env.DEFAULT_USER_REGISTRATION_OFFICE_NAME || '',
				username: process.env.DEFAULT_USER_REGISTRATION_OFFICE_USERNAME || '',
				password: process.env.DEFAULT_USER_REGISTRATION_OFFICE_PASSWORD || '',
				user_type: process.env.DEFAULT_USER_REGISTRATION_OFFICE_TYPE || '',
			},
			{
				name: process.env.DEFAULT_USER_DATA_ENCODER_NAME || '',
				username: process.env.DEFAULT_USER_DATA_ENCODER_USERNAME || '',
				password: process.env.DEFAULT_USER_DATA_ENCODER_PASSWORD || '',
				user_type: process.env.DEFAULT_USER_DATA_ENCODER_TYPE || '',
			},
		])
	} catch(err: any) {
		throw new Error(err)
	}
}


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
			return initDefaultUsers()
		})
		.then(() => {
			logger.info('default users created')
		})
		.catch(err => {
			logger.error(err)
		})
}