import { Request, Response } from "express";
import { UserLog, UserLogModel } from "../../database/log";
import { logger } from "../../logger";
import commonReponseError from "../../util/commonReponseError";

export async function resume(req: Request, res: Response) {
	let { username, token } = req.body
	logger.info(`${username} is resuming session...`)

	try {
		let userLog: UserLogModel = (await UserLog.fetchByUsernameAndToken(username, token))[0]

		if (userLog && userLog.active) {
			logger.info(`${username}'s session resumed`)
			return res.end()
		}

		logger.info(`${username} resume session failed`)
		res.status(401).send('no active session')
	} catch(err: any) {
		commonReponseError(err, res)
	}
}