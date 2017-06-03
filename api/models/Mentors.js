var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema.
var MentorSchema = new Schema({
		first: String,
		last: String,
		email: 	{type: String,  
			unique: true},
		school: String,
		year: String,
		answers: Array,
		status: String,
		student: Object,
		consultations: Array,
		created_at: Date, 
		updated_at: Date
});

// Create a model using schema.
var User = mongoose.model('User',MentorSchema);

// Make this available to our Node applications.
module.exports = User;
