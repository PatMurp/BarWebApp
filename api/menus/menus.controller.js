var _ = require('lodash')
var datastore = require('../datastore');
var Menu = require('./menu.model')

function handleError(res, err) {
	return res.send(500, err);
}

// comment out code below  and uncomment next section to view
// partial mongoose API implementation
//*********************************************************************

// get all menu items from datastore
exports.index = function(req, res) {
	return res.json(200, datastore.menus);
};

// get list of starters from datastre
exports.showStarters = function(req, res) {
	return res.json(200, datastore.menus[0].starters);
}

// get list of mains from datastore
exports.showMains = function(req, res) {
  return res.json(200, datastore.menus[0].mains);
}

// get list of deserts from datastore
exports.showDeserts = function(req, res) {
  return res.json(200, datastore.menus[0].deserts);
}

// get list of wines from datastore
exports.showWines = function(req, res) {
  return res.json(200, datastore.menus[0].wines);
}

// create new starter in datastore
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

//*********************************************************************

// Mongoose partial implementation

// // get all menu items from mongo db
// exports.index = function(req, res) {
// 	Menu.find(function(err, menus) {
// 		if (err) {
// 			return handleError(res, err);
// 		}
// 		return res.json(200, menus);
// 	});
// }

// // get starters from mongo db
// exports.showStarters = function(req, res) {
// 	Menu.find(function(err, menus) {
// 		if (err) {
// 			return handleError(res, err);
// 		}
// 		return res.json(200, menus[0].starters);
// 	});
// }

// // get mains from mongo db
// exports.showMains = function(req, res) {
// 	Menu.find(function(err, menus) {
// 		if (err) {
// 			return handleError(res, err);
// 		}
// 		return res.json(200, menus[0].mains);
// 	});
// }


// // get deserts from mongo db
// exports.showDeserts = function(req, res) {
// 	Menu.find(function(err, menus) {
// 		if (err) {
// 			return handleError(res, err);
// 		}
// 		return res.json(200, menus[0].deserts);
// 	});
// }


// // get wines from mongo db
// exports.showWines = function(req, res) {
// 	Menu.find(function(err, menus) {
// 		if (err) {
// 			return handleError(res, err);
// 		}
// 		return res.json(200, menus[0].wines);
// 	});
// }

// // add starter to mongo db sub document
// exports.createStarter = function(req, res) {
// 	var starter = {
// 		name: req.body.name,
// 		description: req.body.description,
// 		price: req.body.price
// 	}
// 	Menu.update({
// 			 push: {
// 				starters: starter
// 			}
// 		},
// 		function(err) {
// 			if (err) {
// 				return handleError(res, err);
// 			}
// 			return res.json(201, starter);
// 		});
// }

//*********************************************************************

// Implemented for datastore only don't comment out

// update existing starter in datastore
exports.updateStarter = function(req, res) {
	var index = _.findIndex(datastore.menus[0].starters,
		function(starter) {
			return starter.id == req.params.id;
		});
	if (index != -1) {
		var starter = datastore.menus[0].starters[index]
		starter.name = req.body.name
		starter.description = req.body.description
		starter.price = req.body.price
		return res.send(200, starter)
	} else {
		return res.send(404)
	}
};

// update existing starter in datastore
exports.updateMain = function(req, res) {
	var index = _.findIndex(datastore.menus[0].mains,
		function(main) {
			return main.id == req.params.id;
		});
	if (index != -1) {
		var main = datastore.menus[0].mains[index]
		main.name = req.body.name
		main.description = req.body.description
		main.price = req.body.price
		return res.send(200, main)
	} else {
		return res.send(404)
	}
};

// update existing deserts in datastore
exports.updateDesert = function(req, res) {
	var index = _.findIndex(datastore.menus[0].deserts,
		function(desert) {
			return desert.id == req.params.id;
		});
	if (index != -1) {
		var desert = datastore.menus[0].deserts[index]
		desert.name = req.body.name
		desert.description = req.body.description
		desert.price = req.body.price
		return res.send(200, desert)
	} else {
		return res.send(404)
	}
};

// update existing wines in datastore
exports.updateWine = function(req, res) {
	var index = _.findIndex(datastore.menus[0].wines,
		function(wine) {
			return wine.id == req.params.id;
		});
	if (index != -1) {
		var wine = datastore.menus[0].wines[index]
		wine.name = req.body.name
		wine.description = req.body.description
		wine.price = req.body.price
		return res.send(200, wine)
	} else {
		return res.send(404)
	}
};

// delete a starter from datastore
exports.destroyStarter = function(req, res) {
	var elements = _.remove(datastore.menus[0].starters,
		function(starter) {
			return starter.id == req.params.id;
		});
	if (elements.length == 1) {
		return res.send(200);
	} else {
		return res.send(404)
	}
};
