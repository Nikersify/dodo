var config = require('./config')
var redis = require('redis')

console.log('Attempting a connection to Redis at %s:%s', config.redis.host, config.redis.port)
var database = redis.createClient(config.redis.port, config.redis.host, config.redis.options)
console.log("Connected to Redis")

database.select(config.redis.db)
console.log("Selected db %s", config.redis.db)

module.exports = database