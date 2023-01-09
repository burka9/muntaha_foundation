import bcrypt from 'bcrypt'
import { Sequelize, DataTypes, ModelStatic, ENUM } from 'sequelize'
import { logger } from '../../logger'
import { UserModel } from '../../types/userModel'
import { create } from './create'
import { fetch } from './fetch'
import { remove } from './remove'
import { update } from './update'

const { STRING, INTEGER } = DataTypes

let user: ModelStatic<any>

export const User = {
	create(data: Omit<UserModel, 'id'>): Promise<any> {
		if (user === undefined) throw new Error('database not defined')
		return create(user, [data])
	},
	createMany(array: Omit<UserModel, 'id'>[]): Promise<any> {
		if (user === undefined) throw new Error('database not defined')
		return create(user, array)
	},
	fetchAll(filter?: object, withPassword?: boolean): Promise<Partial<UserModel>[]> {
		if (user === undefined) throw new Error('database not defined')
		return fetch(user, filter, withPassword)
	},
	fetchByUsername(username: string, withPassword?: boolean): Promise<Partial<UserModel>[]> {
		if (user === undefined) throw new Error('database not defined')
		return fetch(user, { username }, withPassword)
	},
	update(filter: object, data: Partial<UserModel>): Promise<[affectedCount: number]> {
		if (user === undefined) throw new Error('database not defined')
		return update(user, filter, data)
	},
	removeById(id: number): Promise<number> {
		if (user === undefined) throw new Error('database not defined')
		return remove(user, { id })
	},
	removeByUsername(username: string): Promise<number> {
		if (user === undefined) throw new Error('database not defined')
		return remove(user, { username })
	}
}

export const initUser = (sequelize: Sequelize) => {
	logger.info('creating user table')
	
	user = sequelize.define('user', {
		id: {
			type: INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: STRING
		},
		username: {
			type: STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: STRING,
			allowNull: false
		},
		user_type: {
			type: ENUM,
			allowNull: false,
			values: ['ADMIN', 'REG_OFF', 'ATT_OFF', 'DATA_ENC']
		}
	}, {
		hooks: {
			beforeBulkCreate: (users, options) => {
				users.forEach((user: UserModel) => {
					user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : ""
				})
			},
			beforeUpdate: (user, options) => {
				user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : ""
			},
		}
	})
}