import { ModelStatic, UpdateOptions, WhereOptions } from "sequelize";
import { BeneficiaryModel } from "../../types/beneficiary";

export async function update(Beneficiary: ModelStatic<any>, filter: Partial<BeneficiaryModel>, data: Partial<BeneficiaryModel>): Promise<[affectedCount: number]> {
	let options: UpdateOptions<any> = filter ? {
		where: filter as WhereOptions
	} : {
		where: { id: -1 }
	}

	options = {...options, individualHooks: true }
	
	return Beneficiary.update(data, options)
}
