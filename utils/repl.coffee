repl = require 'repl'

r = repl.start
	prompt: 'Dodo> '
	useGlobal: false
	ignoreUndefined: true

r.on 'exit', ->
	console.log '\nTerminating...'
	process.exit()