var datastore = require('../datastore');

// get list of events
exports.index = function(req, res) {
	return res.json(200, datastore.events);
};