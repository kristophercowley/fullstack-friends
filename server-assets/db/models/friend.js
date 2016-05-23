(function () {

	var store = require('../config').store
		, schemator = require('../config').schemator
		, API = require('../utilities/api-interface')
		, models = require('../utilities/constants').models
		, model = models.friend
		, schema = ResourceSchema()
		, resource = Resource();

	//Add the API Interface to the resource
	resource.api = API(resource, schema);
	module.exports = resource;

	function ResourceSchema() {
		return schemator.defineSchema(model, {
			firstName: 'string',
			lastName: 'string'
		})
	}

	function Resource() {
		return store.defineResource(model, {
			name: model,
		})
	}

} ())