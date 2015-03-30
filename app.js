var express = require('express');

var bodyParser = require('body-parser');
// create express app
var app = express();

// create routing object
var event = require('./api/events/index');

// add routes for events api
app.get('/api/events', event.index);
//app.post('/api/events', event.create);

//app.use(express.static(__dirname + '/public'));

// configure to parse JSON-formatted body
app.use(bodyParser.json());

// add route for the root
app.get('/', function (request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.end("We are up and running!!");
})

app.listen(4000, function() {
  console.log('Server running at http://127.0.0.1:4000/');
});

