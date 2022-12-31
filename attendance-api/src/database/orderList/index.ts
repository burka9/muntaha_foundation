import { DataTypes, ModelStatic, Sequelize } from "sequelize";
import { logger } from "../../logger";
import { OrderListModel } from "../../types/orderList";
import { create } from "./create";
import { fetch } from "./fetch";
import { remove } from "./remove";
import { update } from "./update";

const { INTEGER, STRING, TIME, BOOLEAN } = DataTypes

let orderList: ModelStatic<any>

export const OrderList = {
	create(data: Omit<OrderListModel, 'id'>): Promise<any> {
		if (orderList === undefined) throw new Error('database not defined')
		return create(orderList, [data])
	},
	fetchAll(filter?: Partial<OrderListModel>): Promise<OrderListModel[]> {
		if (orderList === undefined) throw new Error('database not defined')
		return fetch(orderList, filter)
	},
	updateById(id: number, data: Partial<OrderListModel>): Promise<[affectedCount: number]> {
		if (orderList === undefined) throw new Error('database not defined')
		return update(orderList, { id }, data)
	},
	removeById(id: number): Promise<number> {
		if (orderList === undefined) throw new Error('database not defined')
		return remove(orderList, { id })
	},
	removeAll(): Promise<number> {
		if (orderList === undefined) throw new Error('database not defined')
		return remove(orderList)
	}
}

export const initOrderList = (sequelize: Sequelize) => {
	logger.info('creating order list table')

	orderList = sequelize.define('orderList', {
		id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		muntahaId: {
			type: STRING,
			allowNull: false
		},
		name: {
			type: STRING,
			allowNull: false
		},
		timestamp: {
			type: TIME,
			allowNull: false
		},
		active: {
			type: BOOLEAN
		}
	})
}