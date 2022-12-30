import { ModelStatic, UpdateOptions, WhereOptions } from "sequelize";
import { LogListModel } from "../../types/logList";

export async function update(LogList: ModelStatic<any>, filter: Partial<LogListModel>, data: Partial<LogListModel>): Promise<[affectedCount: number]> {
	let options: UpdateOptions<any> = filter ? {
		where: filter as WhereOptions
	} : {
		where: { id: -1 }
	}

	options = {...options, individualHooks: true }
	
	return LogList.update(data, options)
}
