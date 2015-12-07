express = require 'express'
router = express.Router()

router.get '/:name', (req, res) ->
	res.render('room', {title: req.params.name, message: 'welcome to ' + req.params.name})

module.exports = router