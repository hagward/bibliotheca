var express = require('express'),
	mongoose = require('mongoose');

var port = 20489;

mongoose.connect('mongodb://localhost/devdb');

var app = express();
var db = mongoose.connection;

var bookSchema = mongoose.Schema({
	author: String,
	title: String,
	series: String,
	genre: String,
	type: String,
	read: Boolean,
	acquire_date: String
});
var Book = mongoose.model('Book', bookSchema, 'bibliotheca');

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
	// app.use(express.logger());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'));

	app.configure('development', function() {
		app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
	});

	// Returns all the books.
	app.get('/api/books', function(req, res) {
		Book.find(function(err, books) {
			if (err)
				console.error(err);
			else
				res.json({ books: books });
		});
	});

	// Returns a specific book.
	app.get('/api/book/:id', function(req, res) {
		Book.findById(req.params.id, function(err, book) {
			if (err)
				res.json(false);
			else
				res.json(book);
		});
	});

	// Creates a new Book and stores it in the database.
	app.post('/api/add', function(req, res) {
		var data = req.body;
		if (data.title && data.author && data.acqDate) {
			var newBook = new Book({
				title: data.title,
				author: data.author,
				acqDate: new Date(data.acqDate)
			});
			newBook.save(function(err) {
				if (err) console.error('Error: %s', err);
				console.log('New book added:');
				console.log(data);
			});
			res.json(data);
		}
	});

	app.listen(port);
	console.log('Express server started and listening on port %d in %s mode',
		port,
		app.settings.env);
});
