import { VisitedUserModel } from "./visitedUser";

export interface BeneficiaryModel extends Omit<VisitedUserModel, 'recording'> {
	muntahaId: string
}

export interface FetchBeneficiaryListRequest {}
export interface FetchBeneficiaryListResponse {
	success: true,
	list: BeneficiaryModel[]
}

export interface RegisterBeneficiaryRequest extends Omit<BeneficiaryModel, 'id'> {}
export interface RegisterBeneficiaryResponse {}

export interface UpdateBeneficiaryRequest extends Partial<BeneficiaryModel> {
	id: number
}
export interface UpdateBeneficiaryResponse {}

export interface RemoveBeneficiaryRequest {}
export interface RemoveBeneficiaryResponse {
	deletedCount: number
}