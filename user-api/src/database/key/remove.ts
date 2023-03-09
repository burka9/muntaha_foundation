import { DestroyOptions, ModelStatic, WhereOptions } from "sequelize";

export async function remove(Key: ModelStatic<any>, filter: object): Promise<number> {
	const options: DestroyOptions<any> = filter ? {
		where: filter as WhereOptions
	} : {
		where: { id: -1 }
	}
	
	return Key.destroy(options)
}