var app = angular.module("barApp", ['xeditable', 'angAccordion', 'ui.router', 'ngCookies', 'ngAnimate'])
	.config(config)
	.run(run);

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
		.state('adminLogin', {
			url: '/adminLogin',
			templateUrl: 'partials/admin/login.html',
			controller: 'LoginController',
			controllerAs: 'vm'
		})
		.state('adminHome', {
			url: '/admin/home',
			templateUrl: 'partials/admin/home.html',
			controller: 'HomeController',
			controllerAs: 'vm'
		})
		.state('register', {
			url: '/register',
			templateUrl: 'partials/admin/register.html',
			controller: 'RegisterController',
			controllerAs: 'vm'
		})
		.state('adminMenu', {
			url: '/admin/editMenu',
			templateUrl: 'partials/admin/adminMenu.html',
			controller: 'AdminMenuCtrl'
		})
		.state('adminEvents', {
			url: '/admin/events',
			templateUrl: 'partials/admin/adminEvents.html',
			controller: 'AdminEventsCtrl',
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

	$rootScope.$on('$locationChangeStart', function(event, next, current) {
		// redirect to login page if not logged in and trying to access a restricted page
		var restrictedPage = $.inArray($location.path(), [
			'/login', '/register', '/adminLogin', '/home', '/menu', '/events', '/gallery'
		]) === -1;
		var loggedIn = $rootScope.globals.currentUser;
		if (restrictedPage && !loggedIn) {
			$location.path('/home');
		}
	});
}

app.controller('HomePageCtrl', function($scope) {})



app.controller('MenuCtrl', [
	'$scope', '$http',
	function($scope, $http) {
		// use api to diplay menus
		$http.get('/api/menus').success(function(menus) {
			$scope.foodMenus = menus;
		});
	}
]);

// use api to get events
app.controller('EventsCtrl', [
	'$scope', '$http',
	function($scope, $http) {
		$http.get('/api/events').success(function(events) {
			$scope.events = events;
		});
	}
]);


// app.controller('AdminMenuCtrl', function($scope, MenuFactory) {
// 	$scope.foodMenus = MenuFactory.getMenu()
// })

app.controller('AdminMenuCtrl', [
	'$scope', '$http',
	function($scope, $http) {
		// use api to display menus
		$http.get('/api/menus').success(function(menus) {
			$scope.foodMenus = menus;
		});
	}
]);

app.controller('AdminEventsCtrl', ['$scope', 'EventsService', '$http',
	function($scope, EventsService, $http) {
		// use api to get events
		EventsService.getEvents()
			.success(function(events) {
				$scope.events = events;
			});

		// use api to add events
		$scope.addEvent = function() {
			var event = {
				event_date: $scope.newEvent.event_date,
				start_time: $scope.newEvent.start_time,
				playing: $scope.newEvent.playing,
				description: $scope.newEvent.description
			}
			EventsService.addEvent(event)
				.success(function(added_event) {
					$scope.events.push(added_event);
					$scope.newEvent = {}
				});
		}



		// use api and xeditable onaftersave to edit 
		$scope.updateEvent = function(event) {
			console.log(event)
			return $http.put('api/events/' + event.id, {
				id: event.id,
				event_date: event.event_date,
				start_time: event.start_time,
				playing: event.playing,
				description: event.description
			});
		}

		// use api to delete events
		$scope.removeEvent = function(index) {
			$http.delete('/api/events/' + index.id)
				.success(function() {
					$scope.events.splice($scope.events.indexOf(index), 1);
				});
		}
	}
])

// photo slider controller
app.controller('GalleryCtrl', function($scope) {

	$scope.slides = [{
		image: 'img/photos/image1.png',
		description: 'Image 00'
	}, {
		image: 'img/photos/image2.png',
		description: "Image 01"
	}, {
		image: 'img/photos/image3.png',
		description: 'Image 02'
	}, {
		image: 'img/photos/image4.png',
		description: 'Image 03'
	}]

	$scope.currentIndex = 0;

	$scope.setCurrentSlideIndex = function(index) {
		$scope.currentIndex = index;
	};

	$scope.isCurrentSlideIndex = function(index) {
		return $scope.currentIndex === index;
	};

	$scope.prevSlide = function() {
		$scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
	};

	$scope.nextSlide = function() {
		$scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
	};
})

// animation for photo slider
app.animation('.slide-animation', function() {
	return {
		addClass: function(element, className, done) {
			if (className == 'ng-hide') {
				TweenMax.to(element, 0.5, {
					left: -element.parent().width(),
					onComplete: done
				});
			} else {
				done()
			}
		},
		removeClass: function(element, className, done) {
			if (className == 'ng-hide') {
				element.removeClass('ng-hide')

				TweenMax.set(element, {
					left: element.parent().width()
				})
				TweenMax.to(element, 0.5, {
					left: 0,
					onComplete: done
				})
			} else {
				done()
			}
		}
	}
})

// custom reverse array filter
app.filter('reverse', function() {
	return function(items) {
		if (!items || !items.length) {
			return;
		}
		return items.slice().reverse();
	};
});


app.factory('EventsService', ['$http', function($http) {
	var api = {
		getEvents: function() {
			return $http.get('/api/events')
		},
		addEvent: function(event) {
			return $http.post('/api/events', event)
		},
		editEvent: function(event) {
			return $http.put('/api/events/' + event.id, event)
		},
		deleteEvent: function(event) {
			return $http.delete('/api/events/' + event.id, event)
		}
	}
	return api
}]);

// directive that creates a confirmation dialog for delete action
angular.module('barApp').directive('ngReallyClick', [function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			element.bind('click', function() {
				var message = attrs.ngReallyMessage;
				if (message && confirm(message)) {
					scope.$apply(attrs.ngReallyClick);
				}
			});
		}
	}
}]);