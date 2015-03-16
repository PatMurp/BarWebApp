var app = angular.module("barApp", ['xeditable', 'angAccordion','ui.router','ngCookies'])
								 .config(config)
								 .run(run);
								

// app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
function config($stateProvider, $locationProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/home')

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'partials/home.html',
			controller: 'HomePageCtrl'
		})
		.state('menu', {
			url: '/menu',
			templateUrl: 'partials/menu.html',
			controller: 'MenuCtrl'
		})
		.state('events', {
			url: '/events',
			templateUrl: 'partials/events.html',
			controller: 'EventsCtrl'
		})
		.state('gallery', {
			url: '/gallery',
			templateUrl: 'partials/gallery.html',
			controller: 'GalleryCtrl'
		})
		.state('adminMenu', {
			url: '/adminMenu',
			templateUrl: 'partials/admin/login.html',
			controller: 'LoginController',
			controllerAs: 'vm'
		})
		.state('adminHome', {
			url: '/',
			templateUrl: 'partials/admin/home.html',
			controller: 'HomeController',
			controllerAs: 'vm'
		})
}

run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
function run($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    });
}

app.controller('HomePageCtrl', function($scope) {

})

app.controller('MenuCtrl', function($scope, MenuFactory) {
	$scope.foodMenus = MenuFactory.getMenu()

})

app.controller('EventsCtrl', function($scope, EventFactory) {
	$scope.events = EventFactory.getEvent()

	// $scope.orderByDate = function
 //  }
	

})




app.controller('GalleryCtrl', function($scope) {
	$scope.date = new Date();


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

	// testing only to be deleted !!!!
	console.log(Array.isArray(foodMenus))
	console.log(foodMenus[0].starters[0].price)
	var now = new Date()
	console.log(now)


	factory.getMenu = function() {
		return foodMenus
	}

	return factory

})

app.factory('EventFactory', function() {
	var factory = {};
	var events = [{
		date: '14-Mar-2015',
		startTime: '9:00pm',
		playing: "Mountain Thyme"
	}, {
		date: '20-Mar-2015',
		startTime: '9:30pm',
		playing: "Private Party"
	}, {
		date: '21-Mar-2015',
		startTime: '10:00pm',
		playing: "The Indians",
		description: 'Irelands top showband'
	}, {
		date: '28-Mar-2015',
		startTime: '9:00pm',
		playing: "Mountain Thyme"
	}, {
		date: '4-Apr-2015',
		startTime: '9:00pm',
		playing: "Bally slashers",
		description: 'New local band please support!!'
	}, {
		date: '11-Apr-2015',
		startTime: '9:30pm',
		playing: "Nixon",
		description: 'Modern and classic funk, disco, rock & dance'
	}]

	factory.getEvent = function() {
		return events
	}

	factory.orderByDate = function(item) {
		var parts = item.date.split('-');
		var date = new Date(parseInt(parts[2],
												parseInt(parts[1].Month)))
	}

	return factory
})

// //var serviceId = 'loginservice';
// angular.module('barApp').factory(serviceId, ['common', loginservice]);

// function loginservice(common) {
// 	var $q = common.$q;

// 	var service = {
// 		getLoginData: getLoginData;
// 	};
// 	return service;
// 	function getLoginData(email, password, success) {
// 		var data;
// 		if (email === 'pat' && password === 'secret') {
// 			data = 1;
// 		}
// 		else 
// 			data = null;
// 		return success(data;)
// 	}
// }

// +angular.module('barApp').directive('classOnActiveLink', [function() {
// +return {
// +    link: function(scope, element, attrs) {
// +
// +        var anchorLink = element.children()[0].getAttribute('ng-href') || element.children()[0].getAttribute('href');
// +        anchorLink = anchorLink.replace(/^#/, '');
// +
// +        scope.$on("$routeChangeSuccess", function (event, current) {
// +            if (current.$$route.originalPath == anchorLink) {
// +                element.addClass(attrs.classOnActiveLink);
// +            }
// +            else {
// +                element.removeClass(attrs.classOnActiveLink);
// +            }
// +        });
// +    }
// +	};
// +}])

