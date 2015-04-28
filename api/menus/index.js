var express = require('express');
var controller = require('./menus.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/starters', controller.showStarters);
router.get('/mains', controller.showMains);
router.get('/deserts', controller.showDeserts);
router.get('/wines', controller.showWines);

module.exports = router;