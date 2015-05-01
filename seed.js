var mongoose = require('mongoose');
	mongoose.connect('mongodb://bar:ewd15@ds039251.mongolab.com:39251/bar_db');

var Menu = require('./api/menus/menu.model');

Menu.find({}).remove(function() {
	Menu.create({
		starters : [{
			name: 'Wild Turnip',
			description: 'Cooked peeled and cut-up turnips with sliced garlic in olive oil.',
			price: '€4.95'
		}, {
			name: 'Wild mushrooms',
			description: 'Wild mushrooms served with a house roasted garlic mayonnaise.',
			price: '€5.75'
		}, {
			name: 'Daily Soup',
			description: 'Freshly made vegetable based soups, please ask your server for today’s creation!',
			price: '€5.50'
		}],
		mains: [{
			name: 'Lamb Stew',
			description: 'Tender diced lamb, stewed with potato, carrots, celery and pearl barley.',
			price: '€10.65'
		}, {
			name: 'Bacon & Cabbage',
			description: 'Organic slow cooked bacon, potato, cabbage and parsley sauce.',
			price: '€11.75'
		}, {
			name: "Ploughman's Lunch",
			description: 'Roast Beef or Ham, Cheese, chutney, homemade coleslaw & homemade bread.',
			price: '€9.95'
		}],
		deserts: [{
			name: 'Homemade Ice Cream',
			description: 'Luxury ice cream laced through with caramelised brown bread pieces',
			price: '€3.80'
		}, {
			name: 'Fruit Crumble',
			description: 'Our cook selects from a range of fresh seasonal ingredients.',
			price: '€4.50'
		}],
		wines: [{
			name: 'Esperanza Verdejo Viura  -  Rueda',
			description: 'Crisp and refreshing white wine, displays delicate floral aromas and forward fruit',
			price: '€20.80 per bottle or €4.80 per glass'
		}, {
			name: 'Henry Fessy Fleurie',
			description: 'French red wine with black cherry and cassis flavors.',
			price: '€25.00 per bottle or €5.50 per glass'
		}]
	}, function() {
		process.exit()
	});
});