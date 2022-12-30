export interface OrderListModel {
	id: number,
	muntahaId: string,
	name: string,
	timestamp: Date,
	active: boolean
}

export interface FetchOrderListRequest {}
export interface FetchOrderListResponse {
	success: true,
	list: Omit<OrderListModel[], 'active'>
}

export interface RemoveFromOrderListRequest {
	id: number
}
export interface RemoveFromOrderListResponse {}
