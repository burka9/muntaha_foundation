import { ModelStatic } from 'sequelize'
import { UserLogModel } from '.'

export async function create(UserLog: ModelStatic<any>, data: UserLogModel | any): Promise<any> {
	return UserLog.create(data)
}