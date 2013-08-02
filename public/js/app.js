angular.module('bibliotheca', []).
	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.
			when('/', {
				templateUrl: '/partials/index.html',
				controller: IndexCtrl
			}).
			when('/add', {
				templateUrl: '/partials/add.html',
				controller: AddCtrl
			}).
			when('/book/:id', {
				templateUrl: '/partials/book.html',
				controller: BookCtrl
			}).
			otherwise({
				redirectTo: '/'
			});
		$locationProvider.html5Mode(true);
	}]);
