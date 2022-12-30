import { Router } from 'express'
import { visitUploadHandler } from '../../util/fileUpload'
import fetchAll from './fetchAll'
import { markVisited } from './markVisited'
import { create } from './register'
import { removeById } from './removeById'


const router = Router()

router.route('/')
	.get(fetchAll)
	.post(create)

router.route('/:id')
	.delete(removeById)

router.route('/visit')
	.post(visitUploadHandler, markVisited)

export default router