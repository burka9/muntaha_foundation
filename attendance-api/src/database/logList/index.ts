import { DataTypes, ModelStatic, Sequelize } from "sequelize";
import { logger } from "../../logger";
import { LogListModel } from "../../types/logList";
import { create } from "./create";
import { fetch } from "./fetch";
import { remove } from "./remove";
import { update } from "./update";

const { INTEGER, DATE, ENUM } = DataTypes

let logList: ModelStatic<any>

export const LogList = {
	create(data: Omit<LogListModel, 'id'>): Promise<any> {
		if (logList === undefined) throw new Error('database not defined')
		return create(logList, [data])
	},
	createMany(data: Omit<LogListModel, 'id'>[]): Promise<any> {
		if (logList === undefined) throw new Error('database not defined')
		return create(logList, data)
	},
	fetchAll(filter?: Partial<LogListModel>): Promise<LogListModel[]> {
		if (logList === undefined) throw new Error('database not defined')
		return fetch(logList, filter)
	},
	updateById(id: number, data: Partial<LogListModel>): Promise<[affectedCount: number]> {
		if (logList === undefined) throw new Error('database not defined')
		return update(logList, { id }, data)
	},
	removeById(id: number): Promise<number> {
		if (logList === undefined) throw new Error('database not defined')
		return remove(logList, { id })
	}
}

export const initLogList = (sequelize: Sequelize) => {
	logger.info('creating log list table')

	logList = sequelize.define('logList', {
		id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		beneficiaryId: {
			type: INTEGER,
			references: {
				model: 'beneficiaries',
				key: 'id',
			},
			allowNull: false
		},
		status: {
			type: ENUM,
			values: ['present', 'absent', 'permission'],
			allowNull: false
		},
		timestamp: {
			type: DATE,
			allowNull: false
		}
	})
}