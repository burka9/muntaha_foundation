import { UserModel } from '../types/userModel'

export interface CreateUserRequest extends Omit<UserModel, 'id'> {}
export interface CreateUserResponse {}
export interface FetchUserRequest {}
export interface FetchUserResponse {
	success: true,
	list: Omit<UserModel, 'password'>[]
}
export interface RemoveUserRequest {
	id?: number | string,
	username?: string
}
export interface RemoveUserResponse {
	deletedCount: number
}
export interface UpdateUserRequest {
	id: number,
	user: Partial<UserModel>
}
export interface UpdateUserResponse {
	affectedCount: number
}
