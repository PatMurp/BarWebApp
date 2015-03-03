var app = angular.module("barApp", ['ngRoute'])

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
		.otherwise({
			redirectTo: '/home'
		})
}])

app.controller('HomePageCtrl', function($scope) {

})

app.controller('MenuCtrl', function($scope) {

})

app.controller('EventsCtrl', function($scope) {

})

app.controller('GalleryCtrl', function($scope) {

})




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
