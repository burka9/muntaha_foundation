import { Request, Response } from "express";
import { PendingUser } from "../../../database/pendingUser";
import { VisitedUser } from "../../../database/visitedUser";
import { logger } from "../../../logger";
import { VisitPendingUserRequest } from "../../../types/pendingUser";
import { VisitedUserModel } from "../../../types/visitedUser";
import commonResponseError from "../../../util/commonResponseError";
import { deleteFile } from "../../../util/fileUpload";

export async function markVisited(req: Request, res: Response) {
	const body: VisitPendingUserRequest = req.body
	const files = req.files as { [fieldname: string]: Express.Multer.File[] }
	logger.info(`marking pending user ${body.id} as visited...`)

	const { image, recording } = files

	try {
		// fetch user from pending user table
		const pendingUser = (await PendingUser.fetchById(body.id))[0]
		if (!pendingUser) throw new Error(`no pending user by the requested id`)

		// init new visited user object
		const { name, sex, phone, address } = pendingUser
		const visitedUser: Partial<VisitedUserModel> = { name, sex, phone, address, ...body }

		// remove the id property
		delete visitedUser['id']
		
		// set file names
		try {
			visitedUser['image'] = image[0].filename
		} catch {}
		try {
			visitedUser['recording'] = recording[0].filename
		} catch {}
		
		await VisitedUser.create(visitedUser as Omit<VisitedUserModel, 'id'>)
		await PendingUser.removeById(body.id)
		res.sendStatus(201)
	} catch(err: any) {
		commonResponseError(err, res)
		logger.info(`deleting files...`)
		// delete files
		if (image) image.forEach(i => deleteFile(i.path))
		if (recording) recording.forEach(r => deleteFile(r.path))
	}
}