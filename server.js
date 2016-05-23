(function(){
	
	var express = require('express')
		, bodyParser = require('body-parser')
		, server = express()
		, api = require('./server-assets/db/api')
		, port = 8080;
		
		server.use(bodyParser.json())
		server.use(bodyParser.urlencoded({extended: true}))
		
		server.use('/api', api.router)
		server.use(express.static(__dirname + `/public`))
		
		
		server.listen(port, function(){
			console.log(`listening on port: ${port}`)
		})
		
	
}())