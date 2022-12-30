import { DataTypes, ModelStatic, Sequelize, ENUM } from "sequelize";
import { logger } from "../../logger";
import { PendingUserModel } from "../../types/pendingUser";
import { create } from "./create";
import { fetch } from "./fetch";
import { remove } from "./remove";
import { update } from "./update";

const { INTEGER, STRING } = DataTypes

let pendingUser: ModelStatic<any>

export const PendingUser = {
	create(data: Omit<PendingUserModel, 'id'>): Promise<any> {
		if (pendingUser === undefined) throw new Error('database not defined')
		return create(pendingUser, [data])
	},
	createMany(array: Omit<PendingUserModel, 'id'>[]): Promise<any> {
		if (pendingUser === undefined) throw new Error('database not defined')
		return create(pendingUser, array)
	},
	fetchAll(filter?: Partial<PendingUserModel>): Promise<PendingUserModel[]> {
		if (pendingUser === undefined) throw new Error('database not defined')
		return fetch(pendingUser, filter)
	},
	fetchById(id: number): Promise<PendingUserModel[]> {
		if (pendingUser === undefined) throw new Error('database not defined')
		return fetch(pendingUser, { id })
	},
	update(filter: Partial<PendingUserModel>, data: Partial<PendingUserModel>): Promise<[affectedCount: number]> {
		if (pendingUser === undefined) throw new Error('database not defined')
		return update(pendingUser, filter, data)
	},
	updateById(id: number, data: Partial<PendingUserModel>): Promise<[affectedCount: number]> {
		if (pendingUser === undefined) throw new Error('database not defined')
		return update(pendingUser, { id }, data)
	},
	removeById(id: number): Promise<number> {
		if (pendingUser === undefined) throw new Error('database not defined')
		return remove(pendingUser, { id })
	}
}

export const initPendingUser = (sequelize: Sequelize) => {
	logger.info('creating pending user table')

	pendingUser = sequelize.define('pendingUser', {
		id: {
			type: INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: STRING,
			allowNull: false
		},
		sex: {
			type: ENUM,
			values: ['male', 'female'],
			allowNull: false
		},
		phone: {
			type: STRING,
		},
		address: {
			type: STRING
		}
	})
}
