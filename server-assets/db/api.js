(function () {

	var router = require('express').Router();
	var resources = {
		friends: require('./models/friend').api
	}

	Object.keys(resources).forEach(mapResources)

	function mapResources(resource){
		var endpoint = resources[resource]
		 Object.keys(endpoint).forEach(function(method){
			 router.route(`/${resource}/:id?`)[method](endpoint[method])
		 })
	}

	exports.router = router;
})();