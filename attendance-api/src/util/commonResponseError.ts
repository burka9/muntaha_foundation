import { Response } from "express"
import { logger } from "../logger"
import { ErrorResponse } from "../types/error"

export default function(err: any, res: Response) {
	let response: ErrorResponse = {
		message: '',
	}

	if (err.errors) {
		response['message'] = err.errors.map((e: any) => e.message).join('. ')
	} else {
		response['message'] = String(err.message)
	}

	logger.error(response.message)
	res.status(400).json(response)
}
