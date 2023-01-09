import { ModelStatic } from "sequelize";
import { BeneficiaryStatusModel } from "../../types/beneficiaryStatus";

export async function create(BeneficiaryStatus: ModelStatic<any>, data: Omit<BeneficiaryStatusModel, 'id'>[]): Promise<any> {
	return BeneficiaryStatus.bulkCreate(data, {
		individualHooks: true
	})
}
