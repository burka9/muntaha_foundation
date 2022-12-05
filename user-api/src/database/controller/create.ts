import { Request, Response } from "express";
import { logger } from "../../logger";
import { createUser } from "../models/user";


export async function create(req: Request, res: Response) {
	logger.info('creating user...')

	try {
		const result = await createUser(req.body)
		logger.info('user created')
		res.sendStatus(201)
	} catch(err: any) {
		logger.error(err.message)
		res.status(400).send(err.message)
	}
}