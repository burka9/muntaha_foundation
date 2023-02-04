import { Request, Response } from "express";
import { BeneficiaryStatus } from "../../../database/beneficiaryStatus";
import { LogList } from "../../../database/logList";
import { OrderList } from "../../../database/orderList";
import { logger } from "../../../logger";
import { BeneficiaryStatusModel } from "../../../types/beneficiaryStatus";
import { LogListModel } from "../../../types/logList";
import commonResponseError from "../../../util/commonResponseError";

export async function invokeNextDay(req: Request, res: Response) {
	logger.info('invoking next day...')

	try {
		let statuses = await BeneficiaryStatus.fetchAll()

		// copy status data into log table
		await LogList.createMany(statuses.map((status: BeneficiaryStatusModel) => {
			let logObject: Omit<LogListModel, 'id'> = {
				beneficiaryId: status.beneficiaryId,
				name: status.beneficiaryName,
				status: status.status,
				timestamp: new Date()
			}
			return logObject
		}))

		// reset status data and order list
		await BeneficiaryStatus.updateAll({ status: 'absent' })
		await OrderList.removeAll()
		res.sendStatus(200)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}
