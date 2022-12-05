import { Router } from 'express'
import { create } from '../database/controller/create'
import { fetch } from '../database/controller/fetch'
import { remove } from '../database/controller/remove'

const router = Router()


// router.route('/', login)
router.route('/user')
	.get(fetch)
	.post(create)
	// .put()
	.delete(remove)



export default router