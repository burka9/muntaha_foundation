import { Request, Response } from "express";
import { logger } from "../../../logger";
import { User } from '../../../database/user';
import commonReponseError from "../../../util/commonReponseError";


export async function create(req: Request, res: Response) {
	logger.info('creating user...')
	
	try {
		await User.create(req.body)
		logger.info('user created')
		res.sendStatus(201)
	} catch(err: any) {
		commonReponseError(err, res)
	}
}