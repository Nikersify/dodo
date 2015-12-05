express = require 'express'

app = express()

app.set 'view engine', 'jade'

app.get '/', (req, res) ->
	res.render('index', {title: 'works', message: 'lol'})

app.listen 6969, ->
	console.log 'listening on port %s', 6969