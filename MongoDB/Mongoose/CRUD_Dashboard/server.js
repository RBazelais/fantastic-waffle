const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.listen(8003, function(){
	console.log("listening on port 8003");
});

//MONGOOOOOSSEE
mongoose.connect('mongodb://localhost/mouse_guard');

const mouseSchema = new mongoose.Schema({
	first_name: {type: String, required: true, trim: true},
	last_name: {type: String, required: true, trim: true},
	weapon: {type: String, required: true, trim: true},
	}, 
	{
		timestamps: true
	}
);

// app.get('/', function (req, res) {
// 	res.render('index');
// });

const Mouse = mongoose.model('guards', mouseSchema);

// ROUTES
app.get('/', function (req, res) {
	Mouse.find({}, function(err, guards){
		if (err){ console.log(err); }

	console.log('Finding Mouse Guard members...\n', guards); 
	res.render('index', {guards : guards});
	});
});

app.get('/mouseguard/new', function(req, res){
	console.log("POST DATA - get data from form", req.body);
	res.render('new');
});

app.post('/mouseguard', function(req, res){
	console.log("POST DATA - create", req.body);
	// event.preventDefault();
	var mouse = new Mouse({
		first_name: req.body.first_name, 
		last_name: req.body.last_name,
		weapon: req.body.weapon,
	});

	Mouse.create(req.body, function (err, result){
		if (err){ 
			console.log(err);
		}
		res.redirect('/');
	});

});

// app.get('/mouseguard/:id', function(req, res){
// 	console.log("Show your self Mouse!");
// 	// console.log(mouse.first_name + ' ' + mouse.last_name + 'of the Mouse Guard has arrived');
// 	// Mouse.findOne({_id}, function(err, mouse){
// 	// 	if (err){ res.render(err);}
// 	// 	res.render('index');
// 	// });
// 	// console.log('Finding Mouse Guard members...'); 
// });

// app.get('/mouseguard/edit:id', function(req, res){
// 	console.log("POST DATA - Edit", req.body);
// 	// Mouse.findOne({}, function(err, mouse){
// 	// 	if (err){ res.render(err);}
// 	// 	res.render('index');
// 	// });
// 	console.log('Finding Mouse Guard members...'); 
// });

// app.post('/destroy/:id', function(req, res){
// 	console.log("POST DATA - destroy ", req.body);
// 	console.log("A mouse can leave the Guard but the Guard will forever be with them.");
// 	// Mouse.remove({_id}, function(err, mouse){
// 	// 	if (err){ res.render(err);}
// 	// 	res.render('index');
// 	// });
// 	// console.log(mouse.first_name + ' ' + mouse.last_name + ' has retired from the guard.'); 
// });
