var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var MenuitemSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: String, required: true }
});

var MenuSchema = new Schema({
	starters: [MenuitemSchema],
	mains: [MenuitemSchema],
	deserts: [MenuitemSchema],
	wines: [MenuitemSchema]
});

module.exports = mongoose.model('menus', MenuSchema);
