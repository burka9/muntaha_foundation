import { DestroyOptions, ModelStatic, WhereOptions } from "sequelize";
import { BeneficiaryModel } from "../../types/beneficiary";

export async function remove(Beneficiary: ModelStatic<any>, filter: Partial<BeneficiaryModel>): Promise<number> {
	let options: DestroyOptions<any> = filter ? {
		where: filter as WhereOptions
	} : {
		where: { id: -1 }
	}

	options = {...options, individualHooks: true }
	
	return Beneficiary.destroy(options)
}
