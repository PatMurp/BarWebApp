var app = angular.module("barApp", ['ngRoute','xeditable', 'angAccordion'])



app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'HomePageCtrl'
		})
		.when('/menu', {
			templateUrl: 'partials/menu.html',
			controller: 'MenuCtrl'
		})
		.when('/events', {
			templateUrl: 'partials/events.html',
			controller: 'EventsCtrl'
		})
		.when('/gallery', {
			templateUrl: 'partials/gallery.html',
			controller: 'GalleryCtrl'
		})
		.when('/adminMenu', {
			templateUrl: 'partials/admin/adminMenu.html',
			controller: 'AdminMenuCtrl'
		})
		.otherwise({
			redirectTo: '/home'
		})
}])

app.controller('HomePageCtrl', function($scope) {

})

app.controller('MenuCtrl', function($scope, MenuFactory) {
	$scope.foodMenus = MenuFactory.getMenu()

})

app.controller('EventsCtrl', function($scope, MenuFactory) {
	
})


app.controller('GalleryCtrl', function($scope) {

})

app.controller('AdminMenuCtrl', function($scope, MenuFactory) {
	$scope.foodMenus = MenuFactory.getMenu()
})

app.factory('MenuFactory', function() {
	var factory = {}
	var foodMenus = [{
		"starters": [{
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
		"mains": [{
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
		"deserts": [{
			name: 'Homemade Ice Cream',
			description: 'Luxury ice cream laced through with caramelised brown bread pieces',
			price: '€3.80'
		}, {
			name: 'Fruit Crumble',
			description: 'Our cook selects from a range of fresh seasonal ingredients.',
			price: '€4.50'
		}],
		"wines": [{
			name: 'Esperanza Verdejo Viura  -  Rueda',
			description: 'Crisp and refreshing white wine, displays delicate floral aromas and forward fruit',
			price: '€20.80 per bottle or €4.80 per glass'
		}, {
			name: 'Henry Fessy Fleurie',
			description: 'French red wine with black cherry and cassis flavors.',
			price: '€25.00 per bottle or €5.50 per glass'
		}]
	}]
	console.log(Array.isArray(foodMenus))
	console.log(foodMenus[0].starters[0].price)


	factory.getMenu = function() {
		return foodMenus
	}

	return factory

})



// add active class to nav bar based on url
angular.module('barApp').directive('classOnActiveLink', [function() {
	return {
		link: function(scope, element, attrs) {

			var anchorLink = element.children()[0].getAttribute('ng-href') || element.children()[0].getAttribute('href');
			anchorLink = anchorLink.replace(/^#/, '');

			scope.$on("$routeChangeSuccess", function(event, current) {
				if (current.$$route.originalPath == anchorLink) {
					element.addClass(attrs.classOnActiveLink);
				} else {
					element.removeClass(attrs.classOnActiveLink);
				}
			});
		}
	};
}]);