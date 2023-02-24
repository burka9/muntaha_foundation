import { DataTypes, ENUM, ModelStatic, Sequelize } from "sequelize";
import { logger } from "../../logger";
import { BeneficiaryStatusModel } from "../../types/beneficiaryStatus";
import { Beneficiary } from "../beneficiary";
import { create } from "./create";
import { fetch } from "./fetch";
import { update } from "./update";

const { INTEGER, STRING } = DataTypes

let beneficiaryStatus: ModelStatic<any>

export const BeneficiaryStatus = {
	create(data: Partial<BeneficiaryStatusModel>): Promise<any> {
		if (beneficiaryStatus === undefined) throw new Error('database not defined')
		return create(beneficiaryStatus, [data as Omit<BeneficiaryStatusModel, 'id'>])
	},
	fetchAll(filter?: Partial<BeneficiaryStatusModel>): Promise<BeneficiaryStatusModel[]> {
		if (beneficiaryStatus === undefined) throw new Error('database not defined')
		return fetch(beneficiaryStatus, filter)
	},
	updateAll(data: Partial<BeneficiaryStatusModel>): Promise<[affectedCount: number]> {
		if (beneficiaryStatus === undefined) throw new Error('database not defined')
		return update(beneficiaryStatus, {}, data)
	},
	updateById(id: number, data: Partial<BeneficiaryStatusModel>): Promise<[affectedCount: number]> {
		if (beneficiaryStatus === undefined) throw new Error('database not defined')
		return update(beneficiaryStatus, { id }, data)
	},
	getModel(): ModelStatic<any> {
		if (beneficiaryStatus === undefined) throw new Error('database not defined')
		return beneficiaryStatus
	}
}

export const initBeneficiaryStatus = (sequelize: Sequelize) => {
	logger.info('creating beneficiary status table')

	beneficiaryStatus = sequelize.define('beneficiaryStatus', {
		id: {
			type: INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		status: {
			type: ENUM,
			values: ['present', 'absent', 'permission'],
			defaultValue: 'absent'
		},
		beneficiaryId: {
			type: INTEGER,
			references: {
				model: 'beneficiaries',
				key: 'id',
			},
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		},
		// beneficiaryName: {
		// 	type: STRING,
		// 	references: {
		// 		model: 'beneficiaries',
		// 		key: 'name',
		// 	}
		// }
	})

	// set relationship
	try {
		Beneficiary.getModel().hasOne(BeneficiaryStatus.getModel())
	} catch (err: any) {
		logger.error(err.message)
	}
}
