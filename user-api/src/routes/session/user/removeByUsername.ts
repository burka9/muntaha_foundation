import { Request, Response } from "express";
import { logger } from "../../../logger";
import { User } from "../../../database/user";
import commonReponseError from "../../../util/commonReponseError";


export async function removeByUsername(req: Request, res: Response) {
	logger.info(`deleting user ${req.body.username}...`)

	try {
		const result = await User.removeByUsername(req.body.username)
		logger.info('delete complete')
		res.status(202).json({ deletedCount: result })
	} catch(err: any) {
		commonReponseError(err, res)
	}
}