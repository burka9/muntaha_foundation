import { Request, Response } from "express";
import { Beneficiary } from "../../../database/beneficiary";
import { logger } from "../../../logger";
import { RegisterBeneficiaryRequest } from "../../../types/beneficiary";
import commonResponseError from "../../../util/commonResponseError";

export async function register(req: Request, res: Response) {
	logger.info(`registering beneficiary...`)
	const beneficiary: RegisterBeneficiaryRequest = req.body
	const files = req.files as { [fieldname: string]: Express.Multer.File[] }

	try {
		// set filename
		try {
			const { image } = files
			beneficiary['image'] = image[0].filename
		} catch {}

		await Beneficiary.create(beneficiary)
		res.sendStatus(201)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}
