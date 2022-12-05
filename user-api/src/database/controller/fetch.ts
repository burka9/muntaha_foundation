import { Request, Response } from "express";
import { logger } from "../../logger";
import { fetchUser } from "../models/user";


export async function fetch(req: Request, res: Response) {
	logger.info('fetching users...')

	try {
		const result = await fetchUser()
		logger.info('fetch complete')
		res.status(200).json({
			list: result.map(({ id, name, username, user_type }: {
				id: number,
				name: string,
				username: string,
				user_type: string
			}) => ({ id, name, username, user_type }))
		})
	} catch(err: any) {
		logger.error(err.message)
		res.status(400).send(err.message)
	}
}