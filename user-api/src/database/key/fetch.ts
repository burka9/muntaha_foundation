import { ModelStatic } from "sequelize";

export async function fetch(Key: ModelStatic<any>, filter?: object): Promise<any[]> {
	const options: object = filter ? {
		where: filter
	} : {}
	
	return Key.findAll(options)
}