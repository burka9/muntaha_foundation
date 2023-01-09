import { ModelStatic } from "sequelize";
import { LogListModel } from "../../types/logList";

export async function create(LogList: ModelStatic<any>, data: Omit<LogListModel, 'id'>[]): Promise<any> {
	return LogList.bulkCreate(data, {
		individualHooks: true
	})
}
