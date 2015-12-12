express = require 'express'
router = express.Router()
config = require '../utils/config'

router.use ['/room', '/r'], require './room'

router.get '/', (req, res) ->
	res.render('index', {title: 'works', message: 'lol'})

module.exports = router