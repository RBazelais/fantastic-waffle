// Import express and path modules.
var express = require( "express");
var path = require( "path");

// Create the express app.
var app = express();

// Define the static folder.
app.use(express.static(path.join(__dirname, "./static")));

// Setup ejs templating and define the views folder.
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Root route to render the index.ejs view.
app.get('/', function(req, res) {
	console.log("**************")
	console.log("get")
 	res.render("index");
})

app.post('/', function(req, res) {
	console.log("**************")
	console.log("post")
 	res.redirect("/");
})

// tell the express app to listen on port 8001
var server = app.listen(7000, function() {
	console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	console.log("Client/socket is connected!");
	console.log("Client/socket id is: ", socket.id);
	// all the server socket code goes in here

	//recieve data from the form
	socket.on("posting_form", function(data){
		console.log(data);
		$('#incoming_message_box').hide();
		//create random number
		var num = Math.floor(Math.random()* 1000);
		//create a message with that data
		var msg = `You emitted the following message: 
		{name: ${data.name}, 
		language: ${data.language},
		location: ${data.location},
		comment: ${data.comment}} 
		and your number is ${num}`;

		socket.emit('send_back_form_information_and_number', msg);
		console.log("************* server: \n" + msg);
		
	})
})

