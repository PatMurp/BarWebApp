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