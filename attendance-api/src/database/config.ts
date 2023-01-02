import 'dotenv/config'
import { Sequelize } from 'sequelize'
import { logger } from '../logger'
import { initBeneficiary } from './beneficiary'
import { initBeneficiaryStatus } from './beneficiaryStatus'
import { initLogList } from './logList'
import { initOrderList } from './orderList'
import { initPendingUser } from './pendingUser'
import { initVisitedUser } from './visitedUser'


const sequelize = new Sequelize({
	dialect: 'mysql',
	host: process.env.DB_HOST,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: parseInt(process.env.DB_PORT || '3306'),
	logging: log => logger.verbose(log)
})


export function initDatabase() {
	sequelize.authenticate()
		.then(() => {
			logger.info('database connected')
		})
		.catch(err => {
			logger.error(err)
		})

	initPendingUser(sequelize)
	initVisitedUser(sequelize)
	initBeneficiary(sequelize)
	initBeneficiaryStatus(sequelize)
	initOrderList(sequelize)
	initLogList(sequelize)

	sequelize.sync({ force: process.env.FORCE_DATABASE_SYNC === 'true' })
		.then(() => {
			logger.info('tables created')
		})
		.catch(err => {
			logger.error(err)
		})
}