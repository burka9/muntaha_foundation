import { Request, Response } from "express";
import { VisitedUser } from "../../database/visitedUser";
import { logger } from "../../logger";
import { RemoveVisitedListResponse } from "../../types/visitedUser";
import commonResponseError from "../../util/commonResponseError";

export async function removeById(req: Request, res: Response) {
	const { id } = req.params
	logger.info(`deleting visited list user ${id}...`)

	try {
		const result = await VisitedUser.removeById(parseInt(id))
		const response: RemoveVisitedListResponse = {
			deletedCount: result
		}
		logger.info('delete complete')
		res.status(202).json(response)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}
