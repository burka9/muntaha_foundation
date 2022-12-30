import { ModelStatic } from "sequelize";
import { BeneficiaryModel } from "../../types/beneficiary";

export async function fetch(Beneficiary: ModelStatic<any>, filter?: Partial<BeneficiaryModel>): Promise<BeneficiaryModel[]> {
	let options: object = filter ? {
		where: filter
	} : {}
	
	return Beneficiary.findAll(options)
}