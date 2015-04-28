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

