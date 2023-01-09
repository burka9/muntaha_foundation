import { Router } from 'express'
import { addToBeneficiaryList } from './addToBeneficiaryList'
import { fetchAll } from './fetchAll'
import { removeById } from './removeById'


const router = Router()


router.route('/')
	.get(fetchAll)

router.route('/:id')
	.post(addToBeneficiaryList)
	.delete(removeById)

router.route('/add-to-beneficiary/:id')
	.post(addToBeneficiaryList)	
export default router