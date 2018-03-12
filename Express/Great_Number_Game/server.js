const express = require("express");
const path = require("path");
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'supersecretSupersafe' }));
app.use(express.static(path.join(__dirname, "../")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    console.log("*****", req.session, "\nEnd Session *****");
    context = req.session;
    res.render("index", context);
})
app.post('/', function (req, res) {
    if (req.body.NewGame){
        req.session.status = 'reset';
        req.session.result = 'reset';
    }
    if (req.session.status != "inGame"){
        console.log("***********************\nNewGame\n ***********************");
        req.session.status = "inGame"; 
        req.session.number = Math.floor(Math.random() * (100 - 1)) + 1;
        req.session.guess = req.body.guess;
    }
    var guess = req.body.guess;
    console.log("the user guess is:", guess);
    var number = req.session.number;
    if(guess > number){
        req.session.result = "Greater";
    }
    else if (guess < number){
        req.session.result = "Less";
    }
    else if (guess == number) {
        req.session.result = "Win";
    };
    req.session.guess = guess;
    console.log("session guess is:", req.session.guess)
    console.log("game state is:", req.session.status)
    res.redirect("/");
})

app.listen(8000, function () {
    console.log("listening on port 8000");
});