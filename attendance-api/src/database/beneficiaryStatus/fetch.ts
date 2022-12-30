import { ModelStatic } from "sequelize";
import { BeneficiaryStatusModel } from "../../types/beneficiaryStatus";

export async function fetch(BeneficiaryStatus: ModelStatic<any>, filter?: Partial<BeneficiaryStatusModel>): Promise<BeneficiaryStatusModel[]> {
	let options: object = filter ? {
		where: filter
	} : {}
	
	return BeneficiaryStatus.findAll(options)
}