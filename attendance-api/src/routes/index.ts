import 'dotenv/config'
import axios from 'axios'
import { Router } from 'express'
import { logger } from '../logger'
import attendance from './attendance'

const router = Router()

router.use(async (req, res, next) => {
	const { authorization } = req.headers

	try {
		let result = await axios.get(`${process.env.SESSION_URL}/check`, {
			headers: {
				Authorization: authorization
			}
		})

		if (result.status === 200) next()
		else throw new Error()
	} catch (err: any) {
		logger.error(err.toString())
		res.sendStatus(401)
	}
})

router.use('/attendance', attendance)

export default router