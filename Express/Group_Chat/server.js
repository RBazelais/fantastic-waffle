const express = require("express");
const path = require("path");
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
//Key for session
app.use(session({ secret: 'supersecretSupersafe' }));
//connection to static files
app.use(express.static(path.join(__dirname, "./static")));

//connection to views
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render("index");
})
app.post('/', function (req, res) {
    // req.session.Context = req.body;
    res.redirect("/");
})

var server = app.listen(8001, function () {
    console.log("listening on port 8001");
});
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    socket.on("submittedName", function (data) {
        console.log('Someone clicked a button!  Reason: ' + data);
        socket.emit('server_response', { response: "sockets are the best!" });
    })
});