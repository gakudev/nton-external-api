const express = require('express');
const dotenv = require('dotenv')
const router = express.Router();

dotenv.config()
const {duplicateChannel, getCategories} = require('../controllers/duplicate.controller')
const DuplicateService = require('../services/duplicate.service')
const Api = process.env.REST_API

const duplicateService = new DuplicateService(Api)

router.get('/channel-name', (req, res, next) => duplicateChannel(req, res, duplicateService))
router.get('/all-categories', (req, res, next) => getCategories(req, res, duplicateService))

module.exports = router