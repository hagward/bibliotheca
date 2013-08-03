function IndexCtrl($scope, $http) {
	$http.get('/api/books').
		success(function(data) {
			$scope.books = data.books;
		});

	$scope.saveChanges = function(row) {
		console.log($('#booksTable tr').eq(row + 1).eq(0));
	};
}

function AddCtrl($scope, $http, $location) {
	$scope.form = {};
	$scope.addBook = function() {
		$http.post('/api/add', $scope.form).
			success(function(data) {
				$location.path('/');
			});
	};
}

function BookCtrl($scope, $http, $routeParams) {
	$http.get('/api/book/' + $routeParams.id).
		success(function(data) {
			console.log(data);
			$scope.book = data;
		});
}
