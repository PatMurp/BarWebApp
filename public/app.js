var app = angular.module("barApp", ['xeditable', 'angAccordion', 'ngRoute', 'ngCookies', 'ngAnimate', 'UserApp'])


app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: 'partials/home.html',
			controller: 'HomePageCtrl',
			public: true
		})
		.when('/menu', {
			templateUrl: 'partials/menu.html',
			controller: 'MenuCtrl',
			public: true
		})
		.when('/events', {
			templateUrl: 'partials/events.html',
			controller: 'EventsCtrl',
			public: true
		})
		.when('/gallery', {
			templateUrl: 'partials/gallery.html',
			controller: 'GalleryCtrl',
			public: true
		})
		.when('/login', {
			templateUrl: 'partials/admin/login.html',
			public: true,
			login: true
		})
		.when('/adminHome', {
			templateUrl: 'partials/admin/home.html',
			controller: 'HomeController'
		})
		.when('/signup', {
			templateUrl: 'partials/admin/register.html'
		})
		.when('/admin/events', {
			templateUrl: 'partials/admin/adminEvents.html',
			controller: 'AdminEventsCtrl'
		})
		.when('/admin/editMenu', {
			templateUrl: 'partials/admin/adminMenu.html',
			controller: 'AdminMenuCtrl'
		})
		.otherwise({
			redirectTo: '/login'
		})
}])

app.run(function(user) {
	user.init({ appId: '554155f33bbb3' }); // UserApp.io id
	
});


app.controller('HomePageCtrl', function($scope) {})

app.controller('HomeController', function($scope) {})






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

		// use api and xeditable onaftersave to edit starters
		$scope.updateStarter = function(starter) {
			return $http.put('api/menus/starters/' + starter.id, {
				name: starter.name,
				description: starter.description,
				price: starter.price
			});
		}

		// use api and xeditable onaftersave to edit mains
		$scope.updateMain = function(main) {
			return $http.put('api/menus/mains/' + main.id, {
				name: main.name,
				description: main.description,
				price: main.price
			});
		}

		// use api and xeditable onaftersave to edit deserts
		$scope.updateDesert = function(desert) {
			return $http.put('api/menus/deserts/' + desert.id, {
				name: desert.name,
				description: desert.description,
				price: desert.price
			});
		}

		// use api and xeditable onaftersave to edit wines
		$scope.updateWine = function(wine) {
			console.log(wine)
			return $http.put('api/menus/wines/' + wine.id, {
				name: wine.name,
				description: wine.description,
				price: wine.price
			});
		}

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
			return $http.put('api/events/' + event._id, {
				event_date: event.event_date,
				start_time: event.start_time,
				playing: event.playing,
				description: event.description
			});
		}

		// use api to delete events
		$scope.removeEvent = function(index) {
			$http.delete('/api/events/' + index._id)
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

// add active class to nav bar based on url
angular.module('barApp').directive('classOnActiveLink', [function() {
return {
    link: function(scope, element, attrs) {

        var anchorLink = element.children()[0].getAttribute('ng-href') || element.children()[0].getAttribute('href');
        anchorLink = anchorLink.replace(/^#/, '');

        scope.$on("$routeChangeSuccess", function (event, current) {
            if (current.$$route.originalPath == anchorLink) {
                element.addClass(attrs.classOnActiveLink);
            }
            else {
                element.removeClass(attrs.classOnActiveLink);
            }
        });
    }
	};
}]);