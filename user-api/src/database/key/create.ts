import { ModelStatic } from 'sequelize'
import { KeyModel } from '.'

export async function create(Key: ModelStatic<any>, data: KeyModel | any): Promise<any> {
	return Key.create(data)
}