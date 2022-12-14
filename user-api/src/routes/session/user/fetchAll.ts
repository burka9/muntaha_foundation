import { Request, Response } from "express";
import { User } from "../../../database/user";
import { logger } from "../../../logger";
import commonReponseError from "../../../util/commonReponseError";


export async function fetchAll(req: Request, res: Response) {
	logger.info('fetching all users...')

	try {
		const result = await User.fetchAll()
		logger.info('fetch complete')
		res.status(200).json({
			list: result
		})
	} catch(err: any) {
		commonReponseError(err, res)
	}
}