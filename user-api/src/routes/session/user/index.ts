import { Router } from 'express'
import { create } from './create'
import { fetchAll } from './fetchAll'
import { fetchByUsername } from './fetchByUsername'
import { removeById } from './removeById'
import { removeByUsername } from './removeByUsername'
import { update } from './update'


const router = Router()


router.route('/:username')
	.get(fetchByUsername)

router.route('/:id')
	.delete(removeById)

router.route('/')
	.get(fetchAll)
	.post(create)
	.put(update)
	.delete(removeByUsername)



export default router