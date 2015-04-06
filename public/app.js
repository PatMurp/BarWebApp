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
			'/login', '/register', '/adminLogin', '/home', '/menu', '/events'
			]) === -1;
		var loggedIn = $rootScope.globals.currentUser;
		if (restrictedPage && !loggedIn) {
			$location.path('/home');
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
})


app.controller('AdminMenuCtrl', function($scope, MenuFactory) {
	$scope.foodMenus = MenuFactory.getMenu()
})

app.controller('AdminEventsCtrl', function($scope, EventFactory) {
	$scope.events = EventFactory.getEvent()
	$scope.addEvent = function() {
		EventFactory.addEvent($scope.newEvent)
		$scope.newEvent = {}
	}
	// custom delete from filtered array
	$scope.removeEvent = function(event) {
		$scope.events.splice($scope.events.indexOf(event), 1);
	}
})

// photo slider controller
app.controller('GalleryCtrl', function($scope) {
	
	$scope.slides = [
		{image: 'img/photos/image1.png', description: 'Image 00'},
		{image: 'img/photos/image2.png', description: "Image 01"},
		{image: 'img/photos/image3.png', description: 'Image 02'},
		{image: 'img/photos/image4.png', description: 'Image 03'}
	]

	$scope.currentIndex = 0;

  $scope.setCurrentSlideIndex = function (index) {
      $scope.currentIndex = index;
  };

  $scope.isCurrentSlideIndex = function (index) {
      return $scope.currentIndex === index;
  };

  $scope.prevSlide = function () {
      $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
  };

  $scope.nextSlide = function () {
      $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
  };
})

// animation for photo slider
app.animation('.slide-animation', function () {
  return {
    addClass: function (element, className, done) {
        if (className == 'ng-hide') {
            TweenMax.to(element, 0.5, {left: -element.parent().width(), onComplete: done });
        }
        else {
            done()
        }
    },
    removeClass: function (element, className, done) {
        if (className == 'ng-hide') {
          element.removeClass('ng-hide')

          TweenMax.set(element, { left: element.parent().width() })
          TweenMax.to(element, 0.5, {left: 0, onComplete: done })
        }
        else {
            done()
        }
    }
  }
})

// custom reverse array filter
app.filter('reverse', function() {
	return function(items) {
		return items.slice().reverse();
	};
});


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

	factory.getMenu = function() {
		return foodMenus
	}
	return factory
})

app.factory('EventFactory', function() {
	var factory = {};
	var events = [{
		eventDate: '14-Mar-2015',
		startTime: '9:00pm',
		playing: "Mountain Thyme"
	}, {
		eventDate: '20-Mar-2015',
		startTime: '9:30pm',
		playing: "Private Party"
	}, {
		eventDate: '21-Mar-2015',
		startTime: '10:00pm',
		playing: "The Indians",
		description: 'Irelands top showband'
	}, {
		eventDate: '28-Mar-2015',
		startTime: '9:00pm',
		playing: "Mountain Thyme"
	}, {
		eventDate: '04-Apr-2015',
		startTime: '9:00pm',
		playing: "Bally slashers",
		description: 'New local band please support!!'
	}, {
		eventDate: '11-Apr-2015',
		startTime: '9:30pm',
		playing: "Nixon",
		description: 'Modern and classic funk, disco, rock & dance'
	}]

	factory.getEvent = function() {
			return events
		}
	// add event
	factory.addEvent = function(gig) {
		events.push({
			eventDate: gig.eventDate,
			startTime: gig.startTime,
			playing: gig.playing,
			description: gig.description
		})
	}

	return factory
})

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