var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create a schema.
var ConsultationSchema = new Schema({
		first: String,
		last: String,
		email: 	{type: String,  
				unique: true},
		grade: String,
		school: String,
		answers: Array,
		status:String,
		mentor: Object,
		created_at: Date, 
		updated_at: Date
});

// Create a model using schema.
var Consultation = mongoose.model('Consultation',ConsultationSchema);

// Make this available to our Node applications.
module.exports = Consultation;
