export interface LogListModel {
	id: number,
	beneficiaryId: number,
	status: 'present' | 'absent' | 'permission',
	timestamp: Date,
}
