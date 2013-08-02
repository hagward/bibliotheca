function IndexCtrl($scope, $http) {
	$http.get('/api/books').
		success(function(data) {
			$scope.books = data.books;
		});

	var table = document.querySelector('table');
	$scope.table = angular.element(table);

	$scope.editField = function(row, col, id) {
		console.log('row: ' + row + ', col: ' + col + ', id: ' + id);
		console.log($scope.table[row]); //.rows[row].cols[col].innerHTML('hahaha');
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
