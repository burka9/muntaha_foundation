import { resolve } from "path";
import { DataTypes, ModelStatic, Sequelize, ENUM } from "sequelize";
import { logger } from "../../logger";
import { BeneficiaryModel } from "../../types/beneficiary";
import { deleteFile } from "../../util/fileUpload";
import { BeneficiaryStatus } from "../beneficiaryStatus";
import { create } from "./create";
import { fetch } from "./fetch";
import { remove } from "./remove";
import { update } from "./update";

const { INTEGER, STRING } = DataTypes

let beneficiary: ModelStatic<any>

export const Beneficiary = {
	create(data: Omit<BeneficiaryModel, 'id'>): Promise<any> {
		if (beneficiary === undefined) throw new Error('database not defined')
		return create(beneficiary, [data])
	},
	createMany(array: Omit<BeneficiaryModel, 'id'>[]): Promise<any> {
		if (beneficiary === undefined) throw new Error('database not defined')
		return create(beneficiary, array)
	},
	fetchAll(filter?: Partial<BeneficiaryModel> | any): Promise<BeneficiaryModel[]> {
		if (beneficiary === undefined) throw new Error('database not defined')
		return fetch(beneficiary, filter)
	},
	fetchById(id: number): Promise<BeneficiaryModel[]> {
		if (beneficiary === undefined) throw new Error('database not defined')
		return fetch(beneficiary, { id })
	},
	update(filter: Partial<BeneficiaryModel>, data: Partial<BeneficiaryModel>): Promise<[affectedCount: number]> {
		if (beneficiary === undefined) throw new Error('database not defined')
		return update(beneficiary, filter, data)
	},
	updateById(id: number, data: Partial<BeneficiaryModel>): Promise<[affectedCount: number]> {
		if (beneficiary === undefined) throw new Error('database not defined')
		return update(beneficiary, { id }, data)
	},
	removeById(id: number): Promise<number> {
		if (beneficiary === undefined) throw new Error('database not defined')
		return remove(beneficiary, { id })
	}
}

export const initBeneficiary = (sequelize: Sequelize) => {
	logger.info('creating beneficiary table')

	beneficiary = sequelize.define('beneficiary', {
		id: {
			type: INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		muntahaId: {
			type: STRING,
			unique: true
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
		image: {
			type: STRING
		},
		remark: {
			type: STRING
		},

	}, {
		hooks: {
			afterCreate(instance) {
				let temp = `0000${instance.id}`.slice(-3)
				instance.muntahaId = `MUN-${temp}`
				Beneficiary.updateById(instance.id, instance.dataValues)
					.then(() => {
						logger.info(`generated muntaha id for ${instance.id}`)
					})
					.catch(err => logger.error(err))
				BeneficiaryStatus.create({ beneficiaryId: instance.id })
					.then(() => {
						logger.info(`created status row for beneficiary ${instance.id}`)
					})
					.catch(err => logger.error(err))
			},
			beforeDestroy({ id, image }) {
				logger.info(`deleting files for ${id}`)
				try {
					deleteFile(resolve(`${process.env.BENEFICIARY_UPLOAD_PATH || 'uploads'}/${image}`))
					logger.info('deleted image')
				} catch {}
			}
		}
	})
}
