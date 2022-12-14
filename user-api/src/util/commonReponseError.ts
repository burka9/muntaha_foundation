import { Response } from "express"
import { logger } from "../logger"

export default function(err: any, res: Response) {
	if (err.errors) {
		let errors: string = err.errors.map((e: any) => e.message).join('. ')
		logger.error(errors)
		res.status(400).send(errors)
	} else {
		logger.error(err.message)
		res.status(400).send(err.message)
	}
}