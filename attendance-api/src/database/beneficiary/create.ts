import { ModelStatic } from "sequelize";
import { BeneficiaryModel } from "../../types/beneficiary";

export async function create(Beneficiary: ModelStatic<any>, data: Omit<BeneficiaryModel, 'id'>[]): Promise<any> {
	return Beneficiary.bulkCreate(data, {
		individualHooks: true
	})
}
