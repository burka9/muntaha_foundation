import { Request, Response } from "express";
import { PendingUser } from "../../../database/pendingUser";
import { logger } from "../../../logger";
import { RemovePendingUserResponse } from "../../../types/pendingUser";
import commonResponseError from "../../../util/commonResponseError";

export async function removeById(req: Request, res: Response) {
	const { id } = req.params
	logger.info(`deleting pending list user ${id}...`)

	try {
		const result = await PendingUser.removeById(parseInt(id))
		const response: RemovePendingUserResponse = {
			deletedCount: result
		}
		logger.info('delete complete')
		res.status(202).json(response)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}
