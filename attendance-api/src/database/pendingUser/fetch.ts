import { ModelStatic } from "sequelize";
import { PendingUserModel } from "../../types/pendingUser";

export async function fetch(PendingUser: ModelStatic<any>, filter?: Partial<PendingUserModel>): Promise<PendingUserModel[]> {
	let options: object = filter ? {
		where: filter
	} : {}
	
	return PendingUser.findAll(options)
}