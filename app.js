var express = require('express');

var bodyParser = require('body-parser');
// create express app
var app = express();

require('./config/express').addMiddleware(app)
require('./routes')(app)

app.listen(4000, function() {
	console.log('Express server listening');
});


