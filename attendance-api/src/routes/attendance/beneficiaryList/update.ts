import { Request, Response } from "express";
import { resolve } from "path";
import { Beneficiary } from "../../../database/beneficiary";
import { logger } from "../../../logger";
import { BeneficiaryModel, UpdateBeneficiaryRequest } from "../../../types/beneficiary";
import commonResponseError from "../../../util/commonResponseError";
import { deleteFile } from "../../../util/fileUpload";

export async function update(req: Request, res: Response) {
	const { id }: UpdateBeneficiaryRequest = req.body
	const { image } = req.files as { [fieldname: string]: Express.Multer.File[]}
	logger.info(`editing beneficiary ${id}`)

	try {
		// find existing beneficiary
		let temp: any = (await Beneficiary.fetchById(id))[0]
		if (!temp) throw new Error('no beneficiary found')
		const beneficiary: BeneficiaryModel = temp.dataValues

		// new image is uploaded
		if (image) {
			// delete the previous image
			if (beneficiary['image'])
				deleteFile(resolve(process.env.BENEFICIARY_UPLOAD_PATH || 'uploads/beneficiary', beneficiary['image']))

			// set name to the current filename
			try {
				req.body['image'] = image[0].filename
			} catch {}
		}
		
		await Beneficiary.updateById(id, req.body)
		res.sendStatus(200)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}
