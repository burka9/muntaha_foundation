import { Router } from 'express'
import pendingList from './pendingList'
import visitedList from './visitedList'
import beneficiaryList from './beneficiaryList'
import orderList from './orderList'
import { markAsPresent } from './actions/markAsPresent'
import { givePermission } from './actions/givePermission'
import { invokeNextDay } from './actions/invokeNextDay'
import report from './report'

const router = Router()

router.use('/pending-list', pendingList)
router.use('/visited-list', visitedList)
router.use('/beneficiary-list', beneficiaryList)
router.use('/order-list', orderList)
router.use('/report', report)

router.route('/present/:id')
	.put(markAsPresent)

router.route('/permission/:id')
	.put(givePermission)

router.route('/next-day')
	.put(invokeNextDay)


export default router