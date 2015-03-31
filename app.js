var express = require('express');

var bodyParser = require('body-parser');
// create express app
var app = express();

// configure to parse JSON-formatted body
app.use(bodyParser.json());

// create routing object
var event = require('./api/events/index');

// add routes for events api
app.get('/api/events', event.index);
app.post('/api/events', event.create);
app.put('/api/events/:id', event.update);

//app.use(express.static(__dirname + '/public'));



// add route for the root
app.get('/', function (request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.end("We are up and running!!");
})

app.listen(4000);
console.log('Server running at http://127.0.0.1:4000/');

