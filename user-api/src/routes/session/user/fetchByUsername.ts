import { Request, Response } from "express";
import { logger } from "../../../logger";
import { User } from "../../../database/user";
import commonReponseError from "../../../util/commonReponseError";


export async function fetchByUsername(req: Request, res: Response) {
	logger.info(`fetching for user ${req.params.username}...`)

	try {
		const result = await User.fetchByUsername(req.params.username)
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
		commonReponseError(err, res)
	}
}