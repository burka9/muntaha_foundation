import { ModelStatic, UpdateOptions, WhereOptions } from "sequelize";

export async function update(User: ModelStatic<any>, filter: object, data: object): Promise<[affectedCount: number]> {
	let options: UpdateOptions<any> = filter ? {
		where: filter as WhereOptions
	} : {
		where: { id: -1 }
	}

	options = {...options, individualHooks: true }
	
	return User.update(data, options)
}