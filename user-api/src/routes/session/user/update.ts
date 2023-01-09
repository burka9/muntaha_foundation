import { Request, Response } from "express";
import { logger } from "../../../logger";
import { User } from "../../../database/user";
import commonReponseError from "../../../util/commonReponseError";
import { UpdateUserRequest, UpdateUserResponse } from "../../../types/user";


export async function update(req: Request, res: Response) {
	const { id, user }: UpdateUserRequest = req.body
	
	logger.info(`updating user ${id} ...`)

	try {
		const result = await User.update({ id }, user)
		const response: UpdateUserResponse = { affectedCount: result[0] }
		logger.info('update complete')
		res.status(200).json(response)
	} catch(err: any) {
		commonReponseError(err, res)
	}
}
