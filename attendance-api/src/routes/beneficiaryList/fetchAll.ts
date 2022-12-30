import { Request, Response } from "express";
import { Beneficiary } from "../../database/beneficiary";
import { logger } from "../../logger";
import { FetchBeneficiaryListResponse } from "../../types/beneficiary";
import commonResponseError from "../../util/commonResponseError";

export async function fetchAll(req: Request, res: Response) {
	logger.info('fetching all beneficiary list...')

	try {
		let result = await Beneficiary.fetchAll()
		let response: FetchBeneficiaryListResponse = {
			success: true,
			list: result
		}
		logger.info('fetch complete')
		res.status(200).json(response)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}
