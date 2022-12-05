import { Request, Response } from "express";
import { logger } from "../../logger";
import { deleteUser } from "../models/user";


export async function remove(req: Request, res: Response) {
	logger.info(`deleting user...`)

	try {
		const result = await deleteUser(parseInt(req.body.id))
		logger.info('delete complete')
		res.sendStatus(200)
	} catch(err: any) {
		logger.error(err.message)
		res.status(400).json(err.message)
	}
}