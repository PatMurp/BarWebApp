var _ = require('lodash')
var datastore = require('../datastore');

// Get a list of admin users
exports.index = function(req, res) {
	return res.json(200, datastore.users)
};

// create a new admin user in datastore
exports.create = function(req, res) {
	var nextId = 0
	var last = _.last(datastore.users)

	if(last != undefined) {
		nextId = last.id + 1
		console.log(nextId)
	} else {
		nextId = 1
	}
	var user = {
		id: nextId,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		user_name: req.body.user_name,
		password: req.body.password
	};
	datastore.users.push(user)
	return res.json(201, user);
};

// update existing user in datastore
exports.update = function(req, res) {
	var index = _.findIndex(datastore.users,
	function(user) {
		return user.id ==  req.params.id;
	});
	if (index != -1) {
		var user = datastore.users[index]
		user.first_name = req.body.first_name
		user.last_name = req.body.last_name
		user.user_name = req.body.user_name
		user.password = req.body.password
		return res.send(200, user)
	} else {
		return res.send(404)
	}
};

// delete an admin user from datastore
exports.destroy = function(req, res) {
	var elements = _.remove(datastore.users,
		function(user) {
			return user.id == req.params.id;
		});
	if (elements.length == 1) {
		return res.send(200);
	} else {
		return res.send(404);
	}
};