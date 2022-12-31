import { Request, Response } from "express";
import { OrderList } from "../../../database/orderList";
import { logger } from "../../../logger";
import { emitMealServed } from "../../../socket";
import commonResponseError from "../../../util/commonResponseError";

export async function removeFromList(req: Request, res: Response) {
	const { id } = req.params
	logger.info(`removing ${id} from order list...`)

	try {
		await OrderList.updateById(parseInt(id), { active: false })

		// notify meal served and beneficiary count
		try {
			await emitMealServed()
		} catch {}
		
		logger.info('removed from order list')
		res.sendStatus(200)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}