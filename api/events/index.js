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
  console.log(last):
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

// update an existing event in datastore
exports.update = function(req, res) {
	var index = _.findIndex(datastore.events,
		function(event) {
			return event.id == req.params.id;
		});
	if (index != -1) {
		var event = datastore.events[index]
		event.event_date = req.body.event_date
		event.start_time = req.body.start_time
		event.playing = req.body.playing
		event.description = req.body.description
		return res.send(200, event)
	} else {
		return res.send(404)
	}
};