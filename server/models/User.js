var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption.js');

var userSchema = mongoose.Schema({
	email: {type: String, required: "{PATH} is required", index:{unique: true, dropDups: true}},
	username: {type: String, required: "{PATH} is required", index:{unique: true, dropDups: true}},
	password: {type: String, required: "{PATH} is required"},
	salt: {type: String, required: "{PATH} is required"},
	hashed: {type: String, required: "{PATH} is required"},
});

userSchema.methods = {
	authenticate: function(passwordToMatch){
		return encrypt.hashPassword(this.salt, passwordToMatch) === this.hashed;
	}
};

var User = mongoose.model('User', userSchema);