import { Request, Response } from "express";
import { PendingUser } from "../../../database/pendingUser";
import { logger } from "../../../logger";
import { FetchPendingListResponse } from "../../../types/pendingUser";
import commonResponseError from "../../../util/commonResponseError";

export default async function fetchAll(req: Request, res: Response) {
	logger.info('fetching all pending list...')
	
	try {
		let result = await PendingUser.fetchAll()
		let response: FetchPendingListResponse = {
			success: true,
			list: result
		}
		logger.info('fetch complete')
		res.status(200).json(response)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}
