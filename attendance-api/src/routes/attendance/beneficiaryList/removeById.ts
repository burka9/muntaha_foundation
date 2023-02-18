import { Request, Response } from "express";
import { Beneficiary } from "../../../database/beneficiary";
import { logger } from "../../../logger";
import { BeneficiaryModel, RemoveBeneficiaryResponse } from "../../../types/beneficiary";
import commonResponseError from "../../../util/commonResponseError";

export async function removeById(req: Request, res: Response) {
	const { id } = req.params
	logger.info(`deleting beneficiary ${id}...`)

	try {
		const temp: any = (await Beneficiary.fetchById(parseInt(id)))[0]
		if (!temp) throw new Error('no beneficiary found')
		const beneficiary: BeneficiaryModel = temp.dataValues

		beneficiary.deleted = true

		await Beneficiary.updateById(parseInt(id), beneficiary)

		const response: RemoveBeneficiaryResponse = {
			deletedCount: 1
		}
		logger.info('delete complete')
		res.status(202).json(response)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}
