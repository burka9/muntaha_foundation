import { Sequelize, DataTypes, ModelStatic } from 'sequelize'
import { logger } from '../../logger'
import { create } from './create'
import { fetch } from './fetch'
import { remove } from './remove'

const { STRING, BOOLEAN, UUID, UUIDV4 } = DataTypes

let userLog: ModelStatic<any>

export interface UserLogModel {
	username: string,
	active: boolean,
	token?: string,
}

export const UserLog = {
	create(data: UserLogModel): Promise<any> {
		if (userLog === undefined) Promise.reject('database not defined')
		return create(userLog, data)
	},
	fetchByUsername(username: string): Promise<any[]> {
		if (userLog === undefined) Promise.reject('database not defined')
		return fetch(userLog, { username })
	},
	fetchByToken(token: string): Promise<any[]> {
		if (userLog === undefined) Promise.reject('database not defined')
		return fetch(userLog, { token })
	},
	fetchByUsernameAndToken(username: string, token: string): Promise<any[]> {
		if (userLog === undefined) Promise.reject('database not defined')
		return fetch(userLog, { username, token })
	},
	removeByUsernameAndToken(username: string, token: string): Promise<number> {
		if (userLog === undefined) Promise.reject('database not defined')
		return remove(userLog, { username, token })
	}
}

export const initUserLog = (sequelize: Sequelize) => {
	logger.info('creating user log table')

	userLog = sequelize.define('userLog', {
		username: {
			type: STRING,
			allowNull: false,
		},
		token: {
			type: UUID,
			allowNull: false,
			defaultValue: UUIDV4
		},
		active: {
			type: BOOLEAN
		},
	})
}