var mongoose = require('mongoose');

var foodSchema = mongoose.Schema({
	name: {type: String, required: "{PATH} is required"},
	portion: {type: String},
	calories: {type: Number},
	fat: {type: Number},
	carbs: {type: Number},
	protein: {type: Number},
	sodium: {type: Number},
	fiber: {type: Number},
});

foodSchema.methods = {
	authenticate: function(passwordToMatch){
		return encrypt.hashPassword(this.salt, passwordToMatch) === this.hashed;
	}
};

var Food = mongoose.model('Food', foodSchema);