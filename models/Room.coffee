database = require '../utils/database'

class module.exports
	constructor: (@name) ->

	exists: (callback) ->
		database.hexists "room:#{@name}", (err, reply) ->
			callback? err, reply

	get: (key, callback) ->
		database.hget "room:#{@name}", key, (err, reply) ->
			callback? err, reply

	set: (key, value, callback) ->
		database.hset "room:#{@name}", key, value, (err, reply) ->
			callback? err, reply

	hget: (field, key, callback) ->
		database.hget "room:#{@name}:#{field}", key, (err, reply) ->
			callback? err, reply

	hset: (field, key, value, callback) ->
		database.hset "room:#{@name}:#{field}", key, value, (err, reply) ->
			callback? err, reply