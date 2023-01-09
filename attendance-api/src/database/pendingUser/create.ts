import { ModelStatic } from "sequelize";
import { PendingUserModel } from "../../types/pendingUser";

export async function create(PendingUser: ModelStatic<any>, data: Omit<PendingUserModel, 'id'>[]): Promise<any> {
	return PendingUser.bulkCreate(data)
}
