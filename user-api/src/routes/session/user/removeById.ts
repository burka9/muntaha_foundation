import { Request, Response } from "express";
import { logger } from "../../../logger";
import { User } from "../../../database/user";
import commonReponseError from "../../../util/commonReponseError";


export async function removeById(req: Request, res: Response) {
	logger.info(`deleting user ${req.params.id}...`)

	try {
		const result = await User.removeById(parseInt(req.params.id))
		logger.info('delete complete')
		res.status(202).json({ deletedCount: result })
	} catch(err: any) {
		commonReponseError(err, res)
	}
}