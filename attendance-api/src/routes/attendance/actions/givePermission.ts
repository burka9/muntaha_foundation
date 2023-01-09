import { Request, Response } from "express";
import { BeneficiaryStatus } from "../../../database/beneficiaryStatus";
import { OrderList } from "../../../database/orderList";
import { logger } from "../../../logger";
import { emitBeneficiaryCount, emitPresentCount } from "../../../socket";
import commonResponseError from "../../../util/commonResponseError";

export async function givePermission(req: Request, res: Response) {
	const { id } = req.params
	logger.info(`giving ${id} permission`)

	try {
		await BeneficiaryStatus.updateById(parseInt(id), { status: 'permission' })
		await OrderList.removeById(parseInt(id))

		// notify present and beneficiary count update
		try {
			await emitPresentCount()
			await emitBeneficiaryCount()
		} catch {}
		
		logger.info(`gave permission`)
		res.sendStatus(200)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}
