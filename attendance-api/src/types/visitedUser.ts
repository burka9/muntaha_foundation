import { PendingUserModel } from "./pendingUser";

export interface VisitedUserBefore extends PendingUserModel {}
export interface VisitedUserAfter {
	age: number,
	maritalStatus: string,
	children: string, // json string
	jobStatus: string,
	shelterStatus: string,
	rentAmount: number,
	recording?: string,
	image?: string,
	remark: string
}

export interface ModifiedVisitedUserModel {
	children: ChildrenModel[]
}

export interface ChildrenModel {
	name: string,
	age: number,
	schooling: string
}

export interface VisitedUserModel extends VisitedUserBefore, VisitedUserAfter {} 

export interface FetchVisitedListRequest {}
export interface FetchVisitedListReponse {
	success: true,
	list: ModifiedVisitedUserModel[]
}

export interface RemoveVisitedListRequest {}
export interface RemoveVisitedListResponse {
	deletedCount: number
}