import 'dotenv/config'
import { resolve } from 'path'
import { Request, Response } from "express";
import { VisitedUser } from "../../../database/visitedUser";
import { logger } from "../../../logger";
import { BeneficiaryModel } from "../../../types/beneficiary";
import commonResponseError from "../../../util/commonResponseError";
import { copyFile } from "../../../util/fileUpload";
import { Beneficiary } from "../../../database/beneficiary";

export async function addToBeneficiaryList(req: Request, res: Response) {
	const { id } = req.params
	logger.info(`adding ${id} to beneficiary list`)

	try {
		let visistedUser: any = (await VisitedUser.fetchById(parseInt(id)))[0]
		if (!visistedUser) throw new Error('no visited user found')

		// init new beneficiary object
		const beneficiary: Partial<BeneficiaryModel> = { ...visistedUser.dataValues }
		delete beneficiary['id']

		// convert children json to string
		try {
			beneficiary['children'] = JSON.stringify(beneficiary['children'])
		} catch {}

		// rename files
		try {
			copyFile(
				resolve(process.env.VISITED_USER_UPLOAD_PATH || 'uploads', visistedUser.image || 'SOME_FILE_THAT_DONT_EXIST'),
				resolve(process.env.BENEFICIARY_UPLOAD_PATH || 'uploads/beneficiary', visistedUser.image || 'SOME_FILE_THAT_DONT_EXIST')
			)
		} catch {}
		
		await Beneficiary.create(beneficiary as Omit<BeneficiaryModel, 'id'>)
		await VisitedUser.removeById(parseInt(id))
		res.sendStatus(201)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}