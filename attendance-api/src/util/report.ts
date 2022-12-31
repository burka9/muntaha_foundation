import { AttendanceReportModel } from "../types/report";

export function getTotal(logList: AttendanceReportModel[]): Omit<AttendanceReportModel, 'timestamp'> {
	let present = 0
	let absent = 0
	let permission = 0

	logList.forEach(log => {
		present += log.present
		absent += log.absent
		permission += log.permission
	})

	return { present, absent, permission }
}
