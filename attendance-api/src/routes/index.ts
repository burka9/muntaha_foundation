import { Router } from 'express'
import attendance from './attendance'

const router = Router()


router.use('/attendance', attendance)

export default router