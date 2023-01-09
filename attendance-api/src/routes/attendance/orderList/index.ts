import { Router } from 'express'
import { fetchAll } from './fetchAll'
import { removeFromList } from './removeFromList'

const router = Router()

router.route('/')
	.get(fetchAll)

router.route('/:id')
	.delete(removeFromList)

export default router