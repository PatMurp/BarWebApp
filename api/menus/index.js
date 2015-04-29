var express = require('express');
var controller = require('./menus.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/starters', controller.showStarters);
router.get('/mains', controller.showMains);
router.get('/deserts', controller.showDeserts);
router.get('/wines', controller.showWines);

router.post('/starters', controller.createStarter);

router.put('/starters/:id', controller.updateStarter);
router.put('/mains/:id', controller.updateMain);
router.put('/deserts/:id', controller.updateDesert);
router.put('/wines/:id', controller.updateWine);

module.exports = router;