var express = require('express');
var app = express();

var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://herdadvance:Se7en645@ds047950.mongolab.com:47950/mean');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(session({secret: 'go herd'}));
app.use(passport.initialize());
app.use(passport.session());
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


//-------------USER------------

var Schema = mongoose.Schema;

var userSchema = new Schema({
	email: String,
	username: String,
	password: String,
	salt: String,
	hash: String
});

userSchema.methods = {
	authenticate: function(passwordToMatch){
		return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
	},
	hasRole: function(role){
		return this.roles.indexOf(role) > -1;
	}
};

var User = mongoose.model('User', userSchema);

passport.use(new LocalStrategy(
	function(username, password, done){
		User.findOne({username: username}).exec(function(err, user){
			if(user){
				return done(null, user);
			}
			else{
				return done(null, false);
			}
		})
	}
));

passport.serializeUser(function(user, done){
	if(user){
		done(null, user._id);
	}
});

passport.deserializeUser(function(id, done){
	User.findOne({_id:id}).exec(function(err, user){
		if(user){
			return done(null, user);
		}
		else{
			return done(null, false);
		}
	})
});

app.post('/api/login', function(req, res, next){
	var auth = passport.authenticate('local', function(err, user){
		if(err){return next(err);}
		if(!user){return res.send({success: false});}
		req.logIn(user, function(err){
			if(err){return next(err);}
			res.send({success: true, user: user});
		})
	})
	auth(req, res, next);
});

app.post('/api/users', function(req, res){

	var email = req.body.email;
	var username = req.body.username.toLowerCase();
	var password = req.body.password; 

	User.find({email: email}).exec(function(err, collection){
		if(collection.length === 0){
			User.create({
				email: email,
				username: username,
				password: password
			}, function(err, item){
				if (err)
					res.send(err);
			});
		}
		else{
			err = new Error('Duplicate E-Mail');
			return res.send({reason: err.toString()});
		}
	});

	// User.find({ username: 'starlord55' }, function(err, user) {
	//   if (err) throw err;

	//   // object of the user
	//   console.log(user);
	// });

	

});

app.get('/api/users', function(req, res){
	User.find(function(err, users){
		if (err)
			res.send(err);
		res.json(users);
	});
});








app.get('*', function(req, res) {
	res.sendfile('./public/app/index.html');
});



app.listen(8080);
console.log("App listening on port 8080");



