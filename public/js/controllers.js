function IndexCtrl($scope, $http) {
	$http.get('/api/books').
		success(function(data) {
			$scope.books = data.books;
		});

	$scope.deleteBook = function(row) {
		$http.delete('/api/book/' + $scope.books[row]._id);
		$scope.books.splice(row, 1);
	};

	$scope.saveChanges = function(row) {
		var inputData = [];
		$('#booksTable tr:nth-child(' + (row+2) + ') input').each(function(i) {
			inputData.push(($(this).is('input:checkbox'))
				? $(this).prop('checked')
				: $(this).val());
		});

		$scope.books[row].author_fname = inputData[0];
		$scope.books[row].author_lname = inputData[1];
		$scope.books[row].title = inputData[2];
		$scope.books[row].series = inputData[3];
		$scope.books[row].genre = inputData[4];
		$scope.books[row].type = inputData[5];
		$scope.books[row].read = inputData[6];
		$scope.books[row].acquire_date = inputData[7];
		
		$http.put('/api/book/' + $scope.books[row]._id, $scope.books[row]);
	};
}

function AddCtrl($scope, $http, $location) {
	$scope.form = {};
	$scope.addBook = function() {
		$http.post('/api/book', $scope.form).
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
