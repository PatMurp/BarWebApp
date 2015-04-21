var express = require('express');
var controller = require('./menus.controller');

var router = express.Router();

router.get('/', controller.index);

module.exports = router;