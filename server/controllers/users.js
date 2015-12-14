var User = require('mongoose').model('User');
var encrypt = require('../utilities/encryption');

exports.getUsers = function(req, res){
	User.find({}).exec(function(err, collection){
		res.send(collection);
	})
};

exports.addFoodItem = function(req, res, next){
	var itemData = req.body.item;
	var userId = req.body._id;
	User.findOne({_id: userId}).exec(function(err, user){
		user.foods.push(itemData);
		user.save(function(err){
			if(err) {res.status(400); return res.send({reason:err.toString()});}
			res.send(user);
		});
	})
}

exports.createUser = function(req, res, next){
	var userData = req.body;
	userData.username = userData.username.toLowerCase();
	userData.salt = encrypt.createSalt();
	userData.hashed = encrypt.hashPassword(userData.salt, userData.password);

	var dupEmail = false;
	var dupUsername = false;

	User.find({email: userData.email}).exec(function(err, collection){
		if(collection.length > 0){
			dupEmail = true;
		}
	});
	User.find({username: userData.username}).exec(function(err, collection){
		if(collection.length > 0){
			dupUsername = true;
		}
	});

	User.create(userData, function(err, user){
		if(err){
			var errMsg="";
			if(dupEmail){
				errMsg += "An account with this email address already exists.\n"
			}
			if(dupUsername){
				errMsg += "Sorry, this username is already taken."
			}
			err = new Error(errMsg);
			res.status(400);
			return res.send({reason: err.toString()});
		}
		req.logIn(user, function(err){
			if(err){return next(err);}
			res.send(user);
		})
	})
};