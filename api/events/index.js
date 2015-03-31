var _ = require('lodash')
var datastore = require('../datastore');

// get list of events
exports.index = function(req, res) {
	return res.json(200, datastore.events);
};

// create a new event in datastore
exports.create = function(req, res) {
	// assign new id
	var nextId = 0
	var last = _.last(datastore.events)
	if (last != undefined) {
		nextId = last.id + 1
	} else {
		nextId = 1
	}
	var event = {
		id: nextId,
		event_date: req.body.event_date,
		start_time: req.body.start_time,
		playing: req.body.playing,
		description: req.body.description
	};
	datastore.events.push(event)
	return res.json(201, event);
};