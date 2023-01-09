import { DestroyOptions, ModelStatic, WhereOptions } from "sequelize";
import { BeneficiaryStatusModel } from "../../types/beneficiaryStatus";

export async function remove(BeneficiaryStatus: ModelStatic<any>, filter: Partial<BeneficiaryStatusModel>): Promise<number> {
	let options: DestroyOptions<any> = filter ? {
		where: filter as WhereOptions
	} : {
		where: { id: -1 }
	}

	options = {...options, individualHooks: true }
	
	return BeneficiaryStatus.destroy(options)
}
