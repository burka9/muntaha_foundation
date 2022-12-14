import { Request, Response } from "express";
import { logger } from "../../../logger";
import { User } from "../../../database/user";
import commonReponseError from "../../../util/commonReponseError";


export async function update(req: Request, res: Response) {
	logger.info(`updating user ${req.body.id} ...`)

	try {
		const result = await User.update({
			id: req.body.id
		}, req.body.user)
		logger.info('update complete')
		res.status(200).json({ affectedCount: result })
	} catch(err: any) {
		commonReponseError(err, res)
	}
}