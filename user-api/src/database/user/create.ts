import { ModelStatic, Optional } from 'sequelize'
import { UserModel } from '.'

export async function create(User: ModelStatic<any>, data: UserModel[] | any[]): Promise<any> {
	return User.bulkCreate(data as Optional<string, any>[])
}