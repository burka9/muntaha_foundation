import { Request, Response } from "express";
import { UserLog } from "../../database/log";
import { logger } from "../../logger";
import commonReponseError from "../../util/commonReponseError";

export async function logout(req: Request, res: Response) {
	let { username, token } = req.body
	logger.info(`${username} is logging out...`)

	try {
		res.status(200).json({ deletedCount: (await UserLog.removeByUsernameAndToken(username, token)) })
		logger.info(`${username} log out completed`)
	} catch(err: any) {
		commonReponseError(err, res)
	}
}