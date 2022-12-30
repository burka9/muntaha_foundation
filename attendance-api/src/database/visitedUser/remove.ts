import { DestroyOptions, ModelStatic, WhereOptions } from "sequelize";
import { VisitedUserModel } from "../../types/visitedUser";

export async function remove(VisitedUser: ModelStatic<any>, filter: Partial<VisitedUserModel>): Promise<number> {
	let options: DestroyOptions<any> = filter ? {
		where: filter as WhereOptions
	} : {
		where: { id: -1 },
	}

	options = {...options, individualHooks: true }
	
	return VisitedUser.destroy(options)
}
