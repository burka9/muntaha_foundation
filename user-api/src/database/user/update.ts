import { ModelStatic, UpdateOptions, WhereOptions } from "sequelize";

export async function update(User: ModelStatic<any>, filter: object, data: object): Promise<[affectedCount: number]> {
	const options: UpdateOptions<any> = filter ? {
		where: filter as WhereOptions
	} : {
		where: { id: -1 }
	}
	
	return User.update(data, options)
}