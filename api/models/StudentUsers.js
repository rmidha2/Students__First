var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema.
var StudentUserSchema = new Schema({
		first: String,
		last: String,
		email: 	{type: String,  
			unique: true},
		grade: String,
		firstChoice: String,
		secondChoice: String,
		thirdChoice: String,
		average: String,
		bio: String,
		notes:String,
		status:String,
		mentor: Object,
		created_at: Date, 
		updated_at: Date
});

// Create a model using schema.
var StudentUser = mongoose.model('StudentUser',StudentUserSchema);

// Make this available to our Node applications.
module.exports = StudentUser;



