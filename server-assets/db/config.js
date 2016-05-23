(function () {

	var JSData = require('js-data')
		, DSSqlAdapter = require('js-data-sql')
		, Schemator = require('js-data-schema');

	var store = new JSData.DS();

	var schemator = new Schemator();

	var adapter = new DSSqlAdapter({
		client: 'mysql',
		acquireConnectionTimeout: 10000,
		connection: {
			host: "127.0.0.1",
			port: 3306,
			user: "root",
			password: "boisecodeworks333",
			database: "friends"
		}
	})

	


	store.registerAdapter('sql', adapter, { default: true })

	module.exports = {
		store,
		schemator,
		adapter
	};

} ())