import { Request, Response } from "express";
import { logger } from "../../../logger";
import { User } from '../../../database/user';
import commonReponseError from "../../../util/commonReponseError";
import { CreateUserRequest } from "../../../types/user";


export async function create(req: Request, res: Response) {
	logger.info('creating user...')
	let user: CreateUserRequest = req.body

	try {
		await User.create(user)
		logger.info('user created')
		res.sendStatus(201)
	} catch(err: any) {
		commonReponseError(err, res)
	}
}
