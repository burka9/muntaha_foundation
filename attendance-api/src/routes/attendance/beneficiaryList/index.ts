import { Router } from 'express'
import { beneficiaryUploadHandler } from '../../../util/fileUpload'
import { fetchAll } from './fetchAll'
import { register } from './register'
import { removeById } from './removeById'
import { update } from './update'

const router = Router()

router.route('/')
	.get(fetchAll)
	.post(beneficiaryUploadHandler, register)
	.put(beneficiaryUploadHandler, update)

router.route('/:id')
	.delete(removeById)

export default router