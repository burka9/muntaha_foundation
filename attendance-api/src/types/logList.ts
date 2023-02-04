export interface LogListModel {
	id: number;
	beneficiaryId: number;
	name: string;
	status: 'present' | 'absent' | 'permission';
	timestamp: Date;
}
