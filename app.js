var express = require('express');

var bodyParser = require('body-parser');
// create express app
var app = express();

require('./config/express').addMiddleware(app)
require('./routes')(app)

app.listen(process.env.PORT || 4000, function() {
	console.log('Express server listening');
});


