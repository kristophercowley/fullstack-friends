(function () {

	var events = require('./constants').events
	//uuid for generating timestamped ids
	var uuid = require('node-uuid');

	module.exports = API

	function API(resource, schema) {
		return {
			get: get,
			post: create,
			put: update,
			delete: remove
		}

		function get(req, res, next) {
			var id = req.params.id || req.query.id || '';
			var params = req.params.id ? req.params : {};
			var query = req.query;
			if (id) {
				resource.find(id).then(function (data) {
					return res.send(handleResponse(events.find, data))
				}, function (error) {
					return res.send(handleResponse(events.find, null, error))
				})
			} else {
				resource.findAll(params, query)
					.then(function (data) {
						var result = handleResponse(events.findAll, data);
						result.query = query
						result.params = params
						return res.send(result)
					}, function (error) {
						return res.send(handleResponse(events.findAll, null, error))
					})
			}
		}

		function create(req, res, next) {
			var event = events.create

			var errors = schema.validateSync(req.body)
			if (errors) {
				return res.send(handleResponse(event, null, errors));
			}

			req.body.id = uuid.v1()
			resource.create(req.body)
				.then(function (data) {
					return res.send(handleResponse(event, data))
				}, function (error) {
					return res.send(handleResponse(event, null, error))
				})
		}

		function update(req, res, next) {
			var event = events.update
			var id = req.params.id || req.query.id || '';

			var errors = schema.validateSync(req.body)
			if (errors) {
				return res.send(handleResponse(event, null, errors));
			}

			if (!id) {
				return res.send(handleResponse(event, null, { error: { message: 'Invalid request no id provided' } }))
			}

			resource.update(id, req.body).then(function (data) {
				return res.send(handleResponse(event, data))
			}, function (error) {
				return res.send(handleResponse(event, null, error))
			})
		}

		function remove(req, res, next) {
			var event = events.remove
			var id = req.params.id || req.query.id || '';

			if (!id) {
				return res.send(handleResponse(event, null, { error: { message: 'Invalid request no id provided' } }))
			}

			resource.destroy(id).then(function (data) {
				return res.send(handleResponse(event, data))
			}, function (error) {
				return res.send(handleResponse(event, null, error))
			})
		}

		function handleResponse(event, data, error) {
			var response = {
				resourceType: resource.name,
				event: event
			}
			if (error) {
				response.status = 'failed'
				response.error = error
			} else {
				response.status = 'ok',
					response.data = data
			}
			return response
		}

	}

} ())