Vue = require 'vue'

window.io = require('socket.io-client')

$(document).ready ->
	new Vue
		el: '#app'
		data:
			message: 'Hi guis asdklfgjn'