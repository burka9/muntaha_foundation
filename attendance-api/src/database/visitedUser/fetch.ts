import { ModelStatic } from "sequelize";
import { VisitedUserModel } from "../../types/visitedUser";

export async function fetch(VisitedUser: ModelStatic<any>, filter?: Partial<VisitedUserModel>): Promise<VisitedUserModel[]> {
	let options: object = filter ? {
		where: filter
	} : {}
	
	return VisitedUser.findAll(options)
}