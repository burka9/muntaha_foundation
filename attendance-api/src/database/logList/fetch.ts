import { ModelStatic } from "sequelize";
import { LogListModel } from "../../types/logList";

export async function fetch(LogList: ModelStatic<any>, filter?: Partial<LogListModel>): Promise<LogListModel[]> {
	let options: object = filter ? {
		where: filter
	} : {}
	
	return LogList.findAll(options)
}
