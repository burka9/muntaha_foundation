import { Request, Response } from "express";
import { Beneficiary } from "../../../database/beneficiary";
import { BeneficiaryStatus } from "../../../database/beneficiaryStatus";
import { OrderList } from "../../../database/orderList";
import { logger } from "../../../logger";
import { emitBeneficiaryCount, emitPresentCount } from "../../../socket";
import commonResponseError from "../../../util/commonResponseError";

export async function markAsPresent(req: Request, res: Response) {
	const { id } = req.params
	logger.info(`marking ${id} as present`)

	try {
		let beneficiary = (await Beneficiary.fetchById(parseInt(id)))[0]
		if (!beneficiary) throw new Error('no beneficiary found')
		
		await BeneficiaryStatus.updateById(parseInt(id), { status: 'present' })
		await OrderList.create({
			muntahaId: beneficiary.muntahaId,
			active: true,
			name: beneficiary.name,
			timestamp: new Date()
		})

		// notify present and beneficiary count update
		try {
			await emitPresentCount()
			await emitBeneficiaryCount()
		} catch {}
		
		logger.info(`marked as present`)
		res.sendStatus(200)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}
