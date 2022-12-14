import { ModelStatic } from "sequelize";

export async function fetch(UserLog: ModelStatic<any>, filter?: object): Promise<any[]> {
	const options: object = filter ? {
		where: filter
	} : {}
	
	return UserLog.findAll(options)
}