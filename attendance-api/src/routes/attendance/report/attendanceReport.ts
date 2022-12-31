import { addDays, differenceInDays, endOfDay, isEqual, startOfDay, startOfMonth } from "date-fns";
import { Request, Response } from "express";
import { Op } from "sequelize";
import { LogList } from "../../../database/logList";
import { logger } from "../../../logger";
import { AttendanceReportModel, AttendanceReportRequest, AttendanceReportResponse } from "../../../types/report";
import commonResponseError from "../../../util/commonResponseError";
import { getTotal } from "../../../util/report";

export async function attendanceReport(req: Request, res: Response) {
	logger.info(`sending attendance report...`)
	let { start, end}: AttendanceReportRequest = req.query

	// handle date filter
	let startDate = start ? new Date(start) : startOfMonth(new Date())
	let endDate = endOfDay(end ? new Date(end) : new Date())

	try {
		const logList = await LogList.fetchAll({
			timestamp: {
				[Op.between]: [startDate, endDate]
			}
		})

		const list: AttendanceReportModel[] = []
		
		let temp: Date
		for (let i = 0; i <= differenceInDays(endDate, startDate); i++) {
			temp = addDays(startDate, i)
			list.push({
				timestamp: temp,
				present: logList.filter(log => log.status === 'present' && isEqual(startOfDay(log.timestamp), startOfDay(temp))).length,
				absent: logList.filter(log => log.status === 'absent' && isEqual(startOfDay(log.timestamp), startOfDay(temp))).length,
				permission: logList.filter(log => log.status === 'permission' && isEqual(startOfDay(log.timestamp), startOfDay(temp))).length,
			})
		}

		const total = getTotal(list)
		
		const response: AttendanceReportResponse = {
			success: true,
			report: { startDate, endDate, list, total }
		}
		logger.info('report sent')
		res.status(200).json(response)
	} catch(err: any) {
		commonResponseError(err, res)
	}
}
