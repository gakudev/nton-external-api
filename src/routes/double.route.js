const express = require('express');
const dotenv = require('dotenv')
const router = express.Router();

dotenv.config()
const {doubleQuery} = require('../controllers/double.controller')
const DoubleService = require('../services/double.service')
const Api = process.env.REST_API

const doubleService = new DoubleService(Api)

router.get('', (req, res, next) => doubleQuery(req, res, doubleService))

module.exports = router