var _ = require('lodash')
var datastore = require('../datastore');

// get list of menus
exports.index = function(req, res) {
	return res.json(200, datastore.menus);
};

exports.showStarters = function(req, res) {
	return res.json(200, datastore.menus[0].starters);
}

exports.showMains = function(req, res) {
  return res.json(200, datastore.menus[0].mains);
}

exports.showDeserts = function(req, res) {
  return res.json(200, datastore.menus[0].deserts);
}

exports.showWines = function(req, res) {
  return res.json(200, datastore.menus[0].wines);
}

exports.createStarter = function(req, res) {
    var nextId = 0
    var last = _.last(datastore.menus[0].starters)
    if (last != undefined) {
       nextId = last.id + 1
    } else {
      nextId = 1
    }
    console.log(req.body)
    var starter = {
       id: nextId,
       name: req.body.name,
       description: req.body.description,
       price: req.body.price 
    };
    datastore.menus[0].starters.push(starter)
    return res.json(201, starter);
};


