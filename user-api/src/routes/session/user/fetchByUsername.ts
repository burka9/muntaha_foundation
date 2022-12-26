import { Request, Response } from "express";
import { logger } from "../../../logger";
import { User } from "../../../database/user";
import commonReponseError from "../../../util/commonReponseError";
import { UserModel } from "../../../types/userModel";
import { FetchUserResponse } from "../../../types/user";


export async function fetchByUsername(req: Request, res: Response) {
	logger.info(`fetching for user ${req.params.username}...`)

	try {
		const result = await User.fetchByUsername(req.params.username)
		const response: FetchUserResponse = {
			success: true,
			list: result as Omit<UserModel, 'password'>[]
		}
		logger.info('fetch complete')
		res.status(200).json(response)
	} catch(err: any) {
		commonReponseError(err, res)
	}
}