import 'dotenv/config'
import { DataTypes, ModelStatic, Sequelize, ENUM } from "sequelize";
import { logger } from "../../logger";
import { ModifiedVisitedUserModel, VisitedUserModel } from "../../types/visitedUser";
import { deleteFile } from "../../util/fileUpload";
import { create } from "./create";
import { fetch } from "./fetch";
import { remove } from "./remove";
import { update } from "./update";
import path, { resolve } from "path";

const { INTEGER, STRING } = DataTypes

let visitedUser: ModelStatic<any>

export const VisitedUser = {
	create(data: Omit<VisitedUserModel, 'id'>): Promise<any> {
		if (visitedUser === undefined) throw new Error('database not defined')
		return create(visitedUser, [data])
	},
	fetchAll(filter?: Partial<VisitedUserModel>): Promise<ModifiedVisitedUserModel[]> {
		if (visitedUser === undefined) throw new Error('database not defined')
		return fetch(visitedUser, filter)
	},
	fetchById(id: number): Promise<ModifiedVisitedUserModel[]> {
		if (visitedUser === undefined) throw new Error('database not defined')
		return fetch(visitedUser, { id })
	},
	update(filter: Partial<VisitedUserModel>, data: Partial<VisitedUserModel>): Promise<[affectedCount: number]> {
		if (visitedUser === undefined) throw new Error('database not defined')
		return update(visitedUser, filter, data)
	},
	updateById(id: number, data: Partial<VisitedUserModel>): Promise<[affectedCount: number]> {
		if (visitedUser === undefined) throw new Error('database not defined')
		return update(visitedUser, { id }, data)
	},
	removeById(id: number): Promise<number> {
		if (visitedUser === undefined) throw new Error('database not defined')
		return remove(visitedUser, { id })
	}
}

export const initVisitedUser = (sequelize: Sequelize) => {
	logger.info('creating visited user table')

	visitedUser = sequelize.define('visitedUser', {
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
		},
		age: {
			type: INTEGER,
			allowNull: false,
		},
		maritalStatus: {
			type: STRING
		},
		children: {
			type: STRING
		},
		jobStatus: {
			type: STRING,
			allowNull: false,
		},
		shelterStatus: {
			type: STRING,
			allowNull: false,
		},
		rentAmount: {
			type: INTEGER
		},
		recording: {
			type: STRING
		},
		image: {
			type: STRING
		},
		remark: {
			type: STRING
		},
	}, {
		hooks: {
			afterFind(instances) {
				instances.forEach((instance: any) => {
					try {
						instance.children = JSON.parse(instance.children)
					} catch {}
				})
			},
			beforeDestroy({id, image, recording}) {
				logger.info(`deleting files for ${id}`)
				try {
					deleteFile(resolve(`${process.env.VISITED_USER_UPLOAD_PATH || 'uploads'}/${image}`))
					logger.info('deleted image')
				} catch {}
				try {
					deleteFile(resolve(`${process.env.VISITED_USER_UPLOAD_PATH || 'uploads'}/${recording}`))
					logger.info('deleted recording')
				} catch {}
			}
		}
	})
}
