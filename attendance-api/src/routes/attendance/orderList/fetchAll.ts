import { Request, Response } from "express";
import { OrderList } from "../../../database/orderList";
import { logger } from "../../../logger";
import { FetchOrderListResponse } from "../../../types/orderList";
import commonResponseError from "../../../util/commonResponseError";

export async function fetchAll(req: Request, res: Response) {
	logger.info('fetching order list...')

	try {
		const result = await OrderList.fetchAll()
		const response: FetchOrderListResponse = {
			success: true,
			list: result
		}
		logger.info('fetch completed')
		res.status(200).json(response)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}
