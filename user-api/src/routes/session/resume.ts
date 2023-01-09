import { Request, Response } from "express";
import { UserLog, UserLogModel } from "../../database/log";
import { logger } from "../../logger";
import { ErrorResponse } from "../../types/error";
import { ResumeRequest, ResumeResponse } from "../../types/session";
import commonReponseError from "../../util/commonReponseError";

export async function resume(req: Request, res: Response) {
	let { username, token }: ResumeRequest = req.body
	logger.info(`${username} is resuming session...`)

	try {
		let userLog: UserLogModel = (await UserLog.fetchByUsernameAndToken(username, token))[0]
		let response: ResumeResponse | ErrorResponse = {
			message: 'no active session'
		}

		if (userLog && userLog.active) {
			response = {
				success: true
			}
			logger.info(`${username}'s session resumed`)
			return res.json(response)
		}

		logger.info(`${username} resume session failed`)
		res.status(401).json(response)
	} catch(err: any) {
		commonReponseError(err, res)
	}
}