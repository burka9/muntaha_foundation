import { Request, Response } from "express";
import { Beneficiary } from "../../database/beneficiary";
import { logger } from "../../logger";
import { RemoveBeneficiaryResponse } from "../../types/beneficiary";
import commonResponseError from "../../util/commonResponseError";

export async function removeById(req: Request, res: Response) {
	const { id } = req.params
	logger.info(`deleting beneficiary ${id}...`)

	try {
		const result = await Beneficiary.removeById(parseInt(id))
		const response: RemoveBeneficiaryResponse = {
			deletedCount: result
		}
		logger.info('delete complete')
		res.status(202).json(response)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}
