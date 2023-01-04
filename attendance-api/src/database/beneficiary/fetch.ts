import { ModelStatic } from "sequelize";
import { BeneficiaryModel } from "../../types/beneficiary";

export async function fetch(Beneficiary: ModelStatic<any>, filter?: Partial<BeneficiaryModel>, otherOptions?: object): Promise<BeneficiaryModel[]> {
	let options: object = filter ? {
		where: filter
	} : {}

	if (otherOptions)
		options = {...options, ...otherOptions}
	
	return Beneficiary.findAll(options)
}