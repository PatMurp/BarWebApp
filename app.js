var express = require('express');

var bodyParser = require('body-parser');
// create express app
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://bar:ewd15@ds039251.mongolab.com:39251/bar_db')

require('./config/express').addMiddleware(app)
require('./routes')(app)

app.listen(process.env.PORT || 4000, function() {
	console.log('Express server listening');
});


