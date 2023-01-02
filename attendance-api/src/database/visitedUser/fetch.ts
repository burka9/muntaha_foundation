import { ModelStatic } from "sequelize";
import { ModifiedVisitedUserModel, VisitedUserModel } from "../../types/visitedUser";

export async function fetch(VisitedUser: ModelStatic<any>, filter?: Partial<VisitedUserModel>): Promise<ModifiedVisitedUserModel[]> {
	let options: object = filter ? {
		where: filter
	} : {}
	
	return VisitedUser.findAll(options)
}