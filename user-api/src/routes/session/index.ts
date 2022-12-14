import { Router } from 'express'
import { login } from './login'
import { logout } from './logout'
import { resume } from './resume'
import user from './user'


const router = Router()


router.use('/user', user)

router.route('/resume')
	.post(resume)

router.route('/')
	.post(login)
	.delete(logout)


export default router