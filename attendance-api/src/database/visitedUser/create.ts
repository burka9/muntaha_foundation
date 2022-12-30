import { ModelStatic } from "sequelize";
import { VisitedUserModel } from "../../types/visitedUser";

export async function create(VisitedUser: ModelStatic<any>, data: Omit<VisitedUserModel, 'id'>[]): Promise<any> {
	return VisitedUser.bulkCreate(data)
}
