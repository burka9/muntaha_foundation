import { Router } from 'express'
import session from './session'


const router = Router()


router.use('/session', session)


export default router