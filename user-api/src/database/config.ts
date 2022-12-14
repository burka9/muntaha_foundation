import 'dotenv/config'
import { Sequelize } from 'sequelize'
import { logger } from '../logger'


const sequelize = new Sequelize({
	dialect: 'mysql',
	host: process.env.DB_HOST,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: parseInt(process.env.DB_PORT || '3306'),
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

	sequelize.sync({ force: true })
		.then(() => {
			logger.info('tables created')
		})
		.catch(err => {
			logger.error(err)
		})
}