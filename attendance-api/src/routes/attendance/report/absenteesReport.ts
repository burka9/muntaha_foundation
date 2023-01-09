import { endOfDay, startOfMonth } from "date-fns";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { Beneficiary } from "../../../database/beneficiary";
import { LogList } from "../../../database/logList";
import { logger } from "../../../logger";
import { AbsentReportListModel, AbsentReportRequest, AbsentReportResponse } from "../../../types/report";
import commonResponseError from "../../../util/commonResponseError";

export async function absentReport(req: Request, res: Response) {
	logger.info('sending absent report list...')
	let { start, end }: AbsentReportRequest = req.query

	// handle date filter
	let startDate = start ? new Date(start) : startOfMonth(new Date())
	let endDate = endOfDay(end ? new Date(end) : new Date())

	try {
		const logList = await LogList.fetchAll({
			timestamp: {
				[Op.between]: [startDate, endDate]
			}
		})

		const temp = logList.filter(log => log.status === 'absent').map(log => log.beneficiaryId)
		
		const absentList = [...new Set(temp)].map(item => ({
			id: item,
			count: temp.filter(i => i === item).length
		}))

		const beneficiaries = await Beneficiary.fetchAll({
			id: {
				[Op.in]: absentList.filter(item => item.count >= 3).map(item => item.id)
			}
		})

		const list: AbsentReportListModel[] = beneficiaries.map(beneficiary => ({
			id: beneficiary.id,
			muntahaId: beneficiary.muntahaId,
			name: beneficiary.name,
			phone: beneficiary.phone
		}))

		const response: AbsentReportResponse = {
			success: true,
			list
		}

		res.status(200).json(response)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}