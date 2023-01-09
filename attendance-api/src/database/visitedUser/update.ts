import { ModelStatic, UpdateOptions, WhereOptions } from "sequelize";
import { VisitedUserModel } from "../../types/visitedUser";

export async function update(VisitedUser: ModelStatic<any>, filter: Partial<VisitedUserModel>, data: Partial<VisitedUserModel>): Promise<[affectedCount: number]> {
	let options: UpdateOptions<any> = filter ? {
		where: filter as WhereOptions
	} : {
		where: { id: -1 }
	}

	options = {...options, individualHooks: true }
	
	return VisitedUser.update(data, options)
}
