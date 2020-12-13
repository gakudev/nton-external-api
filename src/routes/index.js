const express = require('express')
const router = express.Router()

const singleRoutes = require('./single.route')
const doubleRoutes = require('./double.route')
const duplicateRoutes = require('./duplicate.route')

const logRoute = require('./log.route')
const noRoute = require('./no.route')

router.use(logRoute)
router.use('/duplicate', duplicateRoutes)
router.use('/single', singleRoutes)
router.use('/double', doubleRoutes)
router.use(noRoute)

module.exports = router