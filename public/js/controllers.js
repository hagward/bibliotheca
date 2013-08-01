function IndexCtrl($scope, $http, $route) {
	$http.get('/api/books').
		success(function(data) {
			$scope.books = data.books;
		});

	$scope.form = {};
	$scope.addBook = function() {
		$http.post('/api/add', $scope.form).
			success(function(data) {
				$route.reload();
			});
	};
}

function ViewBookCtrl($scope, $http, $routeParams) {
	$http.get('/api/book/' + $routeParams.id).
		success(function(data) {
			console.log(data);
			$scope.book = data;
		});
}
