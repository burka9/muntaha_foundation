import { ModelStatic, UpdateOptions, WhereOptions } from "sequelize";
import { OrderListModel } from "../../types/orderList";

export async function update(OrderList: ModelStatic<any>, filter: Partial<OrderListModel>, data: Partial<OrderListModel>): Promise<[affectedCount: number]> {
	let options: UpdateOptions<any> = filter ? {
		where: filter as WhereOptions
	} : {
		where: { id: -1 }
	}

	options = {...options, individualHooks: true }
	
	return OrderList.update(data, options)
}
