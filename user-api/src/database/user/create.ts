import { ModelStatic, Optional } from 'sequelize'
import { UserModel } from '../../types/userModel'

export async function create(User: ModelStatic<any>, data: UserModel[] | any[]): Promise<any> {
	return User.bulkCreate(data as Optional<string, any>[])
}