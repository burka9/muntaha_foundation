import { ModelStatic } from 'sequelize'

export async function fetch(User: ModelStatic<any>, filter?: object, withPassword?: true): Promise<any[]> {
	let options: object = filter ? {
		where: filter
	} : {}

	if (!withPassword)
		options = { ...options, attributes: {
			exclude: ['password']
		}}
	
	return User.findAll(options)
}