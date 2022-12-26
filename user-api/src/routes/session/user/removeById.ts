import { Request, Response } from "express";
import { logger } from "../../../logger";
import { User } from "../../../database/user";
import commonReponseError from "../../../util/commonReponseError";
import { RemoveUserRequest, RemoveUserResponse } from "../../../types/user";


export async function removeById(req: Request, res: Response) {
	const { id } = req.params
	logger.info(`deleting user ${id}...`)

	try {
		const result = await User.removeById(parseInt(id))
		const response: RemoveUserResponse = {
			deletedCount: result
		}
		logger.info('delete complete')
		res.status(202).json(response)
	} catch(err: any) {
		commonReponseError(err, res)
	}
}