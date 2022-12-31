import { Router } from 'express'
import { absentReport } from './absenteesReport'
import { attendanceReport } from './attendanceReport'

const router = Router()

router.route('/')
	.get(attendanceReport)

router.route('/absent')
	.get(absentReport)
	
export default router