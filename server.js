var express = require('express');
var app = express();

var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://herdadvance:Se7en645@ds047950.mongolab.com:47950/mean');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

var Item = mongoose.model('Item', {
	name: String,
	portion: String,
	calories: Number,
	fat: Number,
	carbs: Number,
	protein: Number,
	sodium: Number,
	fiber: Number
});



app.get('/api/items', function(req, res){
	Item.find(function(err, items){
		if (err)
			res.send(err);
		res.json(items);
	});
});

app.post('/api/items', function(req, res){
	Item.create({
		name: req.body.name,
		portion: req.body.portion,
		calories: req.body.calories,
		fat: req.body.fat,
		carbs: req.body.carbs,
		protein: req.body.protein,
		sodium: req.body.sodium,
		fiber: req.body.fiber
	}, function(err, item){
		if (err)
			res.send(err);

		Item.find(function(err, items){
			if (err)
				res.send(err)
			res.json(items);
		});

	});
});

app.delete('/api/items/:item_id', function(req, res){
	Item.remove({
		_id: req.params.item_id
	}, function(err, item){
		if (err)
			res.send(err);

		Item.find(function(err, items){
			if(err)
				res.send(err)
			res.json(items);
		});
	});
});

app.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});



app.listen(8080);
console.log("App listening on port 8080");



