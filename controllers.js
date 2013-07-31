var app = angular.module('booksApp', []);

app.factory('simpleFactory', function() {
	var factory = {};
	var columns = ['title', 'author', 'acqDate'];
	var books = [
		{ title: 'Alkemisten', author: 'Paulo Coelho', acqDate: '2009-09-09' },
		{ title: 'Brott och straff', author: 'Fjodor Dostojevskij', acqDate: '2004-05-26' },
		{ title: 'David Copperfield', author: 'Charles Dickens', acqDate: '2011-08-17' },
		{ title: 'Flyga drake', author: 'Khaled Hosseini', acqDate: '2011-05-13' },
		{ title: 'Kafka på stranden', author: 'Haruki Murakami', acqDate: '2013-04-07' },
		{ title: 'Kappan', author: 'Nikolaj Gogol', acqDate: '2018-03-02' },
		{ title: 'Metro 2033', author: 'Dmitrij Gluchovskij', acqDate: '2012-02-05' },
		{ title: 'Tusen strålande solar', author: 'Khaled Hosseini', acqDate: '2011-07-23' }
	];

	factory.getBooks = function() {
		return books;
	};

	factory.getColumns = function() {
		return columns;
	};

	return factory;
});

app.controller('BooksController', function($scope, simpleFactory) {
	$scope.books = simpleFactory.getBooks();
	$scope.columns = simpleFactory.getColumns();
	$scope.orderId = 0;

	$scope.addBook = function() {
		$scope.books.push({
			title: $scope.inputData.title,
			author: $scope.inputData.author,
			acqDate: $scope.inputData.acqDate
		});
		$scope.inputData = {};
	};

	$scope.getOrderBy = function() {
		if ($scope.orderId >= 0 && $scope.orderId < $scope.columns.length)
			return $scope.columns[$scope.orderId];
		else
			return $scope.columns[0];
	}

	$scope.setOrderBy = function(columnId) {
		$scope.orderId = columnId;
	};
});