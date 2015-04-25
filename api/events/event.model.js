var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var EventSchema = new Schema({
	event_date: { type: Date, required: true },
	start_time: { type: Date, required: true },
	playing: { type: String, required: true },
	description: { type: String, optional: true }
});

module.exports = mongoose.model('events', EventSchema);