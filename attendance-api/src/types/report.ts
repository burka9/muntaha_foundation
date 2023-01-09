export interface AttendanceReportModel {
	timestamp: Date,
	present: number,
	absent: number,
	permission: number
}

export interface AbsentReportListModel {
	id: number,
	muntahaId: string,
	name: string,
	phone: string
}

export interface AttendanceReportRequest {
	start?: Date,
	end?: Date
}
export interface AttendanceReportResponse {
	success: true,
	report: {
		startDate: Date,
		endDate: Date,
		list: AttendanceReportModel[],
		total: Omit<AttendanceReportModel, 'timestamp'>
	}
}

export interface AbsentReportRequest {
	start?: Date,
	end?: Date
}

export interface AbsentReportResponse {
	success: true,
	list: AbsentReportListModel[],
}
