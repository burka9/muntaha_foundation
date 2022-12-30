import { DestroyOptions, ModelStatic, WhereOptions } from "sequelize";
import { LogListModel } from "../../types/logList";

export async function remove(LogList: ModelStatic<any>, filter: Partial<LogListModel>): Promise<number> {
	let options: DestroyOptions<any> = filter ? {
		where: filter as WhereOptions
	} : {
		where: { id: -1 }
	}

	options = {...options, individualHooks: true }
	
	return LogList.destroy(options)
}
