import { ModelStatic, UpdateOptions, WhereOptions } from "sequelize";
import { BeneficiaryStatusModel } from "../../types/beneficiaryStatus";

export async function update(BeneficiaryStatus: ModelStatic<any>, filter: Partial<BeneficiaryStatusModel>, data: Partial<BeneficiaryStatusModel>): Promise<[affectedCount: number]> {
	let options: UpdateOptions<any> = filter ? {
		where: filter as WhereOptions
	} : {
		where: { id: -1 }
	}

	options = {...options, individualHooks: true }
	
	return BeneficiaryStatus.update(data, options)
}
