import { ModelStatic } from 'sequelize'
import { UserModel } from '.'

export async function create(User: ModelStatic<any>, data: UserModel | any): Promise<any> {
	return User.create(data)
}