// require express
var express = require("express");

// path module -- try to figure out where and why we use this
var path = require("path");

// create the express app
var app = express();
var bodyParser = require('body-parser');

// use it!
app.use(bodyParser.urlencoded({ extended: true }));

// static content
app.use(express.static(path.join(__dirname, "./static")));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var counter = 0;
// root route to render the index.ejs view
app.get('/', function (req, res) {
	counter++;
	res.render("index", {counter: counter});
})


// tell the express app to listen on port 8000
app.listen(8000, function () {
	console.log("listening on port 8000");
});
