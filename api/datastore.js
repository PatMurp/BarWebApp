exports.events = [{
	id: '1',
	event_date: '14-Mar-2015',
	start_time: '9:00pm',
	playing: "Mountain Thyme"
}, {
	id: '2',
	event_date: '20-Mar-2015',
	start_time: '9:30pm',
	playing: "Private Party"
}, {
	id: '3',
	event_date: '21-Mar-2015',
	start_time: '10:00pm',
	playing: "The Indians",
	description: 'Irelands top showband'
}]

exports.users = [{
	id: 1,
	first_name: 'Pat',
	last_name: 'Jones',
	user_name: 'pat',
	password: 'secret'
}]

exports.menus = [{
	
	starters: [{
		id: '1',
		name: 'Wild Turnip',
		description: 'Cooked peeled and cut-up turnips with sliced garlic in olive oil.',
		price: '€4.95'
	}, {
		id: '2',
		name: 'Wild mushrooms',
		description: 'Wild mushrooms served with a house roasted garlic mayonnaise.',
		price: '€5.75'
	}, {
		id: '3',
		name: 'Daily Soup',
		description: 'Freshly made vegetable based soups, please ask your server for today’s creation!',
		price: '€5.50'
	}],
	
	mains: [{
		id: '1',
		name: 'Lamb Stew',
		description: 'Tender diced lamb, stewed with potato, carrots, celery and pearl barley.',
		price: '€10.65'
	}, {
		id: '2',
		name: 'Bacon & Cabbage',
		description: 'Organic slow cooked bacon, potato, cabbage and parsley sauce.',
		price: '€11.75'
	}, {
		id: '3',
		name: "Ploughman's Lunch",
		description: 'Roast Beef or Ham, Cheese, chutney, homemade coleslaw & homemade bread.',
		price: '€9.95'
	}],

	deserts: [{
		id: '1',
		name: 'Homemade Ice Cream',
		description: 'Luxury ice cream laced through with caramelised brown bread pieces',
		price: '€3.80'
	}, {
		id: '2',
		name: 'Fruit Crumble',
		description: 'Our cook selects from a range of fresh seasonal ingredients.',
		price: '€4.50'
	}],

	wines: [{
		id: '1',
		name: 'Esperanza Verdejo Viura  -  Rueda',
		description: 'Crisp and refreshing white wine, displays delicate floral aromas and forward fruit',
		price: '€20.80 per bottle or €4.80 per glass'
	}, {
		id: '2',
		name: 'Henry Fessy Fleurie',
		description: 'French red wine with black cherry and cassis flavors.',
		price: '€25.00 per bottle or €5.50 per glass'
	}]
}]