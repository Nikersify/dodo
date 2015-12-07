express = require 'express'
cson = require 'cson'

app = express()

config = require './utils/config'

app.set 'view engine', 'jade'
app.use express.static('public')
app.use require './controllers'

app.listen config.server.port, ->
	console.log 'listening on port %s', config.server.port