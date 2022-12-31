import { DestroyOptions, ModelStatic, WhereOptions } from "sequelize";
import { OrderListModel } from "../../types/orderList";

export async function remove(OrderList: ModelStatic<any>, filter?: Partial<OrderListModel>): Promise<number> {
	let options: DestroyOptions<any> = filter ? {
		where: filter as WhereOptions
	} : {
		where: { id: -1 }
	}

	options = {...options, individualHooks: true }
	
	return OrderList.destroy(options)
}
