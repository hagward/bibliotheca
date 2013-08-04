var express = require('express'),
	mongoose = require('mongoose');

var port = 7777;

mongoose.connect('mongodb://localhost/devdb');

var app = express();
var db = mongoose.connection;

var bookSchema = mongoose.Schema({
	author_fname: String,
	author_lname: String,
	title: String,
	series: String,
	genre: String,
	type: String,
	read: Boolean,
	acquire_date: Date
});
var Book = mongoose.model('Book', bookSchema, 'testbooks');

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
	app.post('/api/book', function(req, res) {
		var data = req.body;
		var newBook = new Book({
			author_fname: data.author_fname,
			author_lname: data.author_lname,
			title: data.title,
			series: data.series,
			genre: data.genre,
			type: data.type,
			read: data.read,
			acquire_date: (data.acquire_date) ? new Date(data.acquire_date) : ''
		});
		newBook.save(function(err) {
			if (err)
				console.error('new book error: ', err);
			else
				console.log('New book added:');
			console.log(data);
		});
		res.json(data);
	});

	app.put('/api/book/:id', function(req, res) {
		var id = req.params.id;
		var data = req.body;
		Book.update({ _id: id }, {
			author_fname: data.author_fname,
			author_lname: data.author_lname,
			title: data.title,
			series: data.series,
			genre: data.genre,
			type: data.type,
			read: data.read,
			acquire_date: (data.acquire_date) ? new Date(data.acquire_date) : ''
		}, function(err) {
			if (err)
				console.log('update book error: ', err);
			else
				console.log('Book updated: ', id);
		});
	});

	app.delete('/api/book/:id', function(req, res) {
		var id = req.params.id;
		Book.remove({ _id: id }, function(err) {
			if (err)
				console.log('delete book error: ', err);
			else
				console.log('Book deleted: ', id);
		});
	});

	app.all('*', function(req, res) {
		res.sendfile(__dirname + '/public/index.html');
	});

	app.listen(port);
	console.log('Express server started and listening on port %d in %s mode',
		port,
		app.settings.env);
});
