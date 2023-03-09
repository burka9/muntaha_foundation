import { ModelStatic, Sequelize, DataTypes } from "sequelize";
import { logger } from "../../logger";
import { create } from "./create";
import { fetch } from "./fetch";
import { remove } from "./remove";

const { STRING, BOOLEAN, UUID, UUIDV4 } = DataTypes

let key: ModelStatic<any>

export interface KeyModel {
	token: string;
}

export const Key = {
	create(data: KeyModel): Promise<any> {
		if (key === undefined) throw new Error('database not defined')
		return create(key, data)
	},
	fetchAll(): Promise<any[]> {
		if (key === undefined) throw new Error('database not defined')
		return fetch(key)
	},
	removeById(id: number): Promise<number> {
		if (key === undefined) throw new Error('database not defined')
		return remove(key, { id })
	}
}

export const initKey = (sequelize: Sequelize) => {
	logger.info('creating key table')

	key = sequelize.define('auth_key', {
		token: {
			type: STRING,
			allowNull: false
		},
	})
}
