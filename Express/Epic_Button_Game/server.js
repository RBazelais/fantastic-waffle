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
	var num = 0;
	num++;
 	res.render("index", {num:num});
})

// tell the express app to listen on port 8001
var server = app.listen(8000, function() {
	console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	console.log("Client/socket is connected!");
	console.log("Client/socket id is: ", socket.id);
	// all the server socket code goes in here

	//recieve data from the form
	socket.on("increment_num", function(data){
		// console.log(data);
		//create a message with that data
		let num = data;
		var msg = `The button has be pushed ${data} time(s)`;

		//emit message to client
		socket.emit("send_back_number", { msg: msg, num: num });
		console.log("******* server: \n" + msg);
		
	})
})

