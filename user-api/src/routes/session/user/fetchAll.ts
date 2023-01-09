import { Request, Response } from "express";
import { User } from "../../../database/user";
import { logger } from "../../../logger";
import { FetchUserResponse } from "../../../types/user";
import { UserModel } from "../../../types/userModel";
import commonReponseError from "../../../util/commonReponseError";


export async function fetchAll(req: Request, res: Response) {
	logger.info('fetching all users...')

	try {
		const result = await User.fetchAll()
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