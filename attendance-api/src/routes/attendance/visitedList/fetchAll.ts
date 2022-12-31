import { Request, Response } from "express";
import { VisitedUser } from "../../../database/visitedUser";
import { logger } from "../../../logger";
import { FetchVisitedListReponse } from "../../../types/visitedUser";
import commonResponseError from "../../../util/commonResponseError";

export async function fetchAll(req: Request, res: Response) {
	logger.info('fetching all visisted list...')

	try {
		let result = await VisitedUser.fetchAll()
		let response: FetchVisitedListReponse = {
			success: true,
			list: result
		}
		logger.info('fetch complete')
		res.status(200).json(response)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}
