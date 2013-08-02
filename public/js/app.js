angular.module('bibliotheca', []).
	config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider.
			when('/', {
				templateUrl: '/partials/index.html',
				controller: IndexCtrl
			}).
			when('/add', {
				templateUrl: '/partials/add.html',
				controller: ViewBookCtrl
			}).
			when('/book/:id', {
				templateUrl: '/partials/book.html',
				controller: ViewBookCtrl
			}).
			otherwise({
				redirectTo: '/'
			});
		$locationProvider.html5Mode(true);
	}]);
