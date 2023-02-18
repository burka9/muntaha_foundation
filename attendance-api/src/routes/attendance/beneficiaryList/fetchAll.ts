import { Request, Response } from "express";
import { Beneficiary } from "../../../database/beneficiary";
import { BeneficiaryStatus } from "../../../database/beneficiaryStatus";
import { logger } from "../../../logger";
import { BeneficiaryModelExtended, FetchBeneficiaryListResponse } from "../../../types/beneficiary";
import commonResponseError from "../../../util/commonResponseError";

export async function fetchAll(req: Request, res: Response) {
	logger.info('fetching all beneficiary list...')

	try {
		let result = await Beneficiary.fetchAll({ deleted: false }, {
			attributes: {
				exclude: ['createdAt', 'updatedAt']
			},
			include: [
				{
					model: BeneficiaryStatus.getModel(),
					attributes: ['status']
				}
			]
		})
		let response: FetchBeneficiaryListResponse = {
			success: true,
			list: result as BeneficiaryModelExtended[]
		}
		logger.info('fetch complete')
		res.status(200).json(response)
	} catch(err: any) {
		console.log(err)
		commonResponseError(err, res)
	}
}
