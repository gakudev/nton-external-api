const express = require('express')
const dotenv = require('dotenv')
const router = express.Router()

dotenv.config()
const {baseUrl} = require('../controllers/base.controller')
const BaseService = require('../services/base.service')
const Api = process.env.REST_API
const baseService = new BaseService(Api)
const singleRoutes = require('./single.route')
const doubleRoutes = require('./double.route')
const duplicateRoutes = require('./duplicate.route')

const logRoute = require('./log.route')
const noRoute = require('./no.route')

router.use(logRoute)
router.get('', (req, res, next) => baseUrl(req, res, baseService))
router.use('/duplicate', duplicateRoutes)
router.use('/single', singleRoutes)
router.use('/double', doubleRoutes)
router.use(noRoute)

module.exports = router