export interface BeneficiaryStatusModel {
	id: number,
	status: 'present' | 'absent' | 'permission',
	beneficiaryId: number,
}
