var _ = require('lodash')
var datastore = require('../datastore');

// get list of menus
exports.index = function(req, res) {
	return res.json(200, datastore.menus);
};