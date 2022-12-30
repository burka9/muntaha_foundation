import { ModelStatic, UpdateOptions, WhereOptions } from "sequelize";
import { PendingUserModel } from "../../types/pendingUser";

export async function update(PendingUser: ModelStatic<any>, filter: Partial<PendingUserModel>, data: Partial<PendingUserModel>): Promise<[affectedCount: number]> {
	let options: UpdateOptions<any> = filter ? {
		where: filter as WhereOptions
	} : {
		where: { id: -1 }
	}

	options = {...options, individualHooks: true }
	
	return PendingUser.update(data, options)
}
