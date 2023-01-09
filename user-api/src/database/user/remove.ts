import { DestroyOptions, ModelStatic, WhereOptions } from "sequelize";

export async function remove(User: ModelStatic<any>, filter: object): Promise<number> {
	const options: DestroyOptions<any> = filter ? {
		where: filter as WhereOptions
	} : {
		where: { id: -1 }
	}
	
	return User.destroy(options)
}