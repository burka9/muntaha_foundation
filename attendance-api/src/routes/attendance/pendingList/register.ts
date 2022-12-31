import { Request, Response } from "express";
import { PendingUser } from "../../../database/pendingUser";
import { logger } from "../../../logger";
import { CreatePendingUserRequest } from "../../../types/pendingUser";
import commonResponseError from "../../../util/commonResponseError";

export async function create(req: Request, res: Response) {
	logger.info('creating pending user...')
	let pendingUser: CreatePendingUserRequest = req.body

	try {
		await PendingUser.create(pendingUser)
		logger.info('pending user created')
		res.sendStatus(201)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}
