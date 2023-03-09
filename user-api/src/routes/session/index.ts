import { Router } from 'express'
import { UserLog } from '../../database/log'
import { User } from '../../database/user'
import { base64ToString } from '../../util/string'
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


router.get('/check', async (req, res) => {
	try {
		const { authorization } = req.headers
		const data = authorization?.split(' ')

		if (data && data[0] === 'Bearer') {
			const { username, token } = JSON.parse(base64ToString(data[1]))
			const user = await User.fetchByUsername(username)
			const log = await UserLog.fetchByUsernameAndToken(username, token)

			if (user.length > 0 && log.length > 0) return res.sendStatus(200)
		}

		throw new Error()
	} catch {
		res.sendStatus(401)
	}
})


export default router