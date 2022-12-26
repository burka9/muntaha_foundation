import { Request, response, Response } from "express";
import { logger } from "../../../logger";
import { User } from "../../../database/user";
import commonReponseError from "../../../util/commonReponseError";
import { RemoveUserResponse } from "../../../types/user";


export async function removeByUsername(req: Request, res: Response) {
	const { username } = req.body
	logger.info(`deleting user ${username}...`)

	try {
		const result = await User.removeByUsername(username)
		const response: RemoveUserResponse = { deletedCount: result }
		logger.info('delete complete')
		res.status(202).json(response)
	} catch(err: any) {
		commonReponseError(err, res)
	}
}