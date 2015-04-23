var _ = require('lodash')
var datastore = require('../datastore');

// get list of menus
exports.index = function(req, res) {
	return res.json(200, datastore.menus);
};

// exports.show = function(req, res) {
// 	return res.json(200, datastore.menus[0])
// }

exports.show = function(req, res) {
    var index = _.findIndex(datastore.menus , 
           function(menu) {
              return menu.id == req.params.id;
        });      
     if (index != -1) {
        return res.json(200, datastore.menus[1])
      } else {
        return res.send (404)
      }
} ;