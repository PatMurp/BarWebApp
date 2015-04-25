var _ = require('lodash')
var datastore = require('../datastore');
var Event = require('./event.model');

// error handling function
function handleError(res, err) {
	return res.send(500,err);
}

// get list of events from mongo db
exports.index = function(req, res) {
	Event.find(function (err, events) {
		if(err) {return handleError(res, err);}
		return res.json(200, events);
	});
}

// create a new event in mongo db
exports.create = function(req, res) {
	Event.create(req.body, function(err, event) {
		if(err) {return handleError(res, err);}
		return res.json(201, event);
	});
}

// update an existing event in datastore
exports.update = function(req, res) {
	Event.findById(req.params.id, function (err, event) {
		event.event_date = req.body.event_date
		event.start_time = req.body.start_time
		event.playing = req.body.playing
		event.description = req.body.description
		event.save(function (err) {
			if(err) {return handleError(res, err);}
			return res.send(200, "Update seccessfull");
		});
	});
};


// delete an event from datastore
exports.destroy = function(req, res) {
  Event.findById(req.params.id, function (err, event) {
    event.remove(function (err) {
      if(err) {return handleError(res, err);}
      return res.send(200, 'Deleted');
    });
  });
};
