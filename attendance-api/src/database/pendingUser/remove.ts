import { DestroyOptions, ModelStatic, WhereOptions } from "sequelize";
import { PendingUserModel } from "../../types/pendingUser";

export async function remove(PendingUser: ModelStatic<any>, filter: Partial<PendingUserModel>): Promise<number> {
	const options: DestroyOptions<any> = filter ? {
		where: filter as WhereOptions
	} : {
		where: { id: -1 }
	}
	
	return PendingUser.destroy(options)
}
