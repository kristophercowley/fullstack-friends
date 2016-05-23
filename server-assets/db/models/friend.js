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
			firstName: { type: 'string', unique: false, isRequired: true },
			lastName: { type: 'string' , unique: false, isRequired: true },
			phoneNumber: { type: 'string || undefined', unique: false, isRequired: false },
			streetAddress: { type: 'string || undefined', unique: false, isRequired: false},
			thumbnail: { type: 'string || undefined', unique: false, isRequired: false},

		})
	}

	function Resource() {
		return store.defineResource(model, {
			name: model,
		})
	}

} ())