import { ModelStatic } from "sequelize";
import { OrderListModel } from "../../types/orderList";

export async function fetch(OrderList: ModelStatic<any>, filter?: Partial<OrderListModel>): Promise<OrderListModel[]> {
	let options: object = filter ? {
		where: filter
	} : {}
	
	return OrderList.findAll(options)
}
