import { Request, Response } from "express";
import { UserLog } from "../../database/log";
import { logger } from "../../logger";
import { LogoutRequest, LogoutResponse } from "../../types/session";
import commonReponseError from "../../util/commonReponseError";

export async function logout(req: Request, res: Response) {
	let { username, token }: LogoutRequest = req.body
	logger.info(`${username} is logging out...`)

	try {
		let response: LogoutResponse = { logoutCount: (await UserLog.removeByUsernameAndToken(username, token)) }

		res.status(200).json(response)
		logger.info(`${username} log out completed`)
	} catch(err: any) {
		commonReponseError(err, res)
	}
}