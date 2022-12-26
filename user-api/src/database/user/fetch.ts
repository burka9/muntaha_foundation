import { ModelStatic } from 'sequelize'
import { UserModel } from '../../types/userModel'

export async function fetch(User: ModelStatic<any>, filter?: object, withPassword?: boolean): Promise<Partial<UserModel>[]> {
	let options: object = filter ? {
		where: filter
	} : {}

	if (!withPassword)
		options = { ...options, attributes: {
			exclude: ['password']
		}}
	
	return User.findAll(options)
}