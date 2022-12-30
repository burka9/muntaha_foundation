import { ModelStatic } from "sequelize";
import { OrderListModel } from "../../types/orderList";

export async function create(OrderList: ModelStatic<any>, data: Omit<OrderListModel, 'id'>[]): Promise<any> {
	return OrderList.bulkCreate(data, {
		individualHooks: true
	})
}
