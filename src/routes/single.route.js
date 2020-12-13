const express = require('express');
const dotenv = require('dotenv')
const router = express.Router();

dotenv.config()
const {singleQuery} = require('../controllers/single.controller')
const SingleService = require('../services/single.service')
const Api = process.env.REST_API

const singleService = new SingleService(Api)

router.get('', (req, res, next) => singleQuery(req, res, singleService))

module.exports = router