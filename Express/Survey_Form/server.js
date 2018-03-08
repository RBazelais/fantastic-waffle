// require express
var express = require("express");

// path module -- try to figure out where and why we use this
var path = require("path");

// create the express app
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// root route to render the index.ejs view
app.get('/', function (req, res) {
	res.render("index");
})

var count = 0;
// root route to render the result.ejs view
app.post('/result', function (req, res) {
	var name = req.body.name;
	var location = req.body.location;
	var language = req.body.language;
	var comment = req.body.comment;
	count++;
	console.log("POST DATA", req.body);
	res.render('result', {
		name: name,
		location: location,
		language: language,
		comment: comment,
		count: count
	})
})

 
// tell the express app to listen on port 8000
app.listen(8000, function () {
	console.log("listening on port 8000");
});
