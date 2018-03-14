const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const session = require('express-session');

const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, './static')));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// app.use(session({ secret: 'scoobydooo' }));

app.listen(8003, function(){
	console.log("listening on port 8003");
});

//MONGOOOOOSSEE
mongoose.connect('mongodb://localhost/quoting_dojo');

const quoteSchema = new mongoose.Schema({
	name: {type: String, required: true, trim: true},
	quote: {type: String, required: true, trim: true},
	}, 
	{
		timestamps: true
	}
);

app.get('/', function (req, res) {
    res.render('index');
});

const Quote = mongoose.model('quotes', quoteSchema);

app.get('/quotes', function(req, res){
	console.log("Ahhh fuck");
	Quote.find({}, function(err, quotes){
		if (err){ res.render(err);}
		res.render('quotes', {quotes: quotes});
	});
	console.log('Finding quotes'); 
});

app.post('/quotes', function(req, res){
	console.log("POST DATA", req.body);
    
    var quote = new Quote({
		name: req.body.name, 
		quote: req.body.quote,
	});

	Quote.create(req.body, function (err, result){
		if (err){ 
			res.render(err);
		}
		res.render('quotes');
	});

});

