var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var app = express();
var db = mongoose.connection;
var request = require('request');
var StudentUser = require('./models/StudentUsers');
var Mentor = require('./models/Mentors')
var Consultation = require('./models/Consultation')

// app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + './../app/'));
// server
app.listen(80, function() {
	console.log('Server Started  on http://localhost:8080');
	console.log('Press CTRL + C to stop server');
});

mongoose.connect('mongodb://localhost/data/db/');

// Log to console any errors or a successful connection.
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("Connected to db at /data/db/")
});

// typeforms
var urlStudentApp ='https://api.typeform.com/v1/form/UE3GJh?key=5ddd6f5fa90e0ccb017d3c39f1cce8d758c9590a&completed=true'
var urlMentorApp = 'https://api.typeform.com/v1/form/AfTCuq?key=5ddd6f5fa90e0ccb017d3c39f1cce8d758c9590a&completed=true'
var urlConsultation = 'https://api.typeform.com/v1/form/Y4oeHy?key=5ddd6f5fa90e0ccb017d3c39f1cce8d758c9590a&completed=true'

app.get('/updateData',function(req,res){
	var one = false;
	var two = false;
	var three = false;
	// typeform student app
	request(urlStudentApp, function (error, response) {
	  if (!error && response.statusCode == 200) {
	  	var res = JSON.parse(response.body)
	  	var resArr = [];

	  	for (var i = 0; i < res.responses.length; i++) {
	  		
	  		resArr[i] = [];
		  	var j = 0;

		  	for (var input in res.responses[i].answers) {
		  		resArr[i][j] = res.responses[i].answers[input];
		  		j++;
		  	}  		
	  	}
	    for (var i = 0; i < resArr.length; i++) {
		  	var newStudentUser = StudentUser({
			    	first: resArr[i][0],
					last: resArr[i][1],
					email: resArr[i][2],
					grade: resArr[i][3],
					firstChoice: resArr[i][5],
					secondChoice: resArr[i][6],
					thirdChoice: resArr[i][7],
					average: resArr[i][8],
					bio: resArr[i][9],
					notes:resArr[i][10],
					status: 'APPLIED'  
			    });
			newStudentUser.save(function(err) {
			    if (err) {
			        console.log(err)
			    } else {
			        console.log('Student App created!');
			    }
			});
	  	}
	  }
	    one = true;
	    send(one, two, three);  
	})
	// typeform mentor app
	request(urlMentorApp, function (error, response) {
	  if (!error && response.statusCode == 200) {
	  	var res = JSON.parse(response.body)
	  	var resArr = [];

	  	for (var i = 0; i < res.responses.length; i++) {
	  		
	  		resArr[i] = [];
		  	var j = 0;

		  	for (var input in res.responses[i].answers) {
		  		resArr[i][j] = res.responses[i].answers[input];
		  		j++;
		  	}  		
	  	}
	    for (var i = 0; i < resArr.length; i++) {
		  	var newMentor = Mentor({
			    	first: resArr[i][0],
					last: resArr[i][1],
					email: resArr[i][2],
					school: resArr[i][3],
					year: resArr[i][4],
					answers: [resArr[i][7],resArr[i][8],resArr[i][9],resArr[i][10],resArr[i][11]],
					status: 'APPLIED',
					consultations: []  
			    });
			newMentor.save(function(err) {
			    if (err) {
			        console.log(err)
			    } else {
			        console.log('Mentor App created!');
			    }
			});
	  	}
	  }
	    two = true;
	    send(one, two, three);  
	})
	// typefrom Consultation app
	request(urlConsultation, function (error, response) {
	  if (!error && response.statusCode == 200) {
	  	var res = JSON.parse(response.body)
	  	var resArr = [];

	  	console.log(res)
	  	for (var i = 0; i < res.responses.length; i++) {
	  		
	  		resArr[i] = [];
		  	var j = 0;

		  	for (var input in res.responses[i].answers) {
		  		resArr[i][j] = res.responses[i].answers[input];
		  		j++;
		  	}  		
	  	}
	    for (var i = 0; i < resArr.length; i++) {
		  	var newConsultation = Consultation({
			    	first: resArr[i][0],
			    	last: resArr[i][1],
					email: resArr[i][2],
					grade: resArr[i][3],
					school: resArr[i][5],
					answers: [resArr[i][6],resArr[i][7],resArr[i][8]],
					status: 'APPLIED',
					mentor:{} 
			    });
			newConsultation.save(function(err) {
			    if (err) {
			        console.log(err)
			    } else {
			        console.log('Consultation created!');
			    }
			});
	  	}
	  }
	  	three = true;
		send(one, two, three);  
	})
	function send(one, two, three){
	if (one === true && two === true && three === true) {
		res.send('');
	}
}
})


// get all students
app.get('/users',function(req,res){
	StudentUser.find({}, function(err, Users) {
	    if (err) {
	        console.log(err);
	        res.status(400)
	           .json({err:err});
	    } else {
	        res.json(Users);
	    }
	});
});
// get one user
app.get('/user/:id',function(req,res){
	StudentUser.findOne({'_id':req.params.id}, function(err, User) {
	    if (err) {
	        console.log(err);
	        res.status(400)
	           .json({err:err});
	    } else {
	        res.json(User);
	    }
	});
});
// update user
app.put('/user/:id',function(req,res){
	var query = {"_id":req.params.id}
	StudentUser.update(query,req.body,{},function(err,user){
		if(err){
			console.log(err);
			res.status(400)
			   .json({err:err})
		}
		else{
			res.json(user);
		}
	});
});
// remove user
app.delete('/user/:id',function(req,res){
	StudentUser.findOne({"_id":req.params.id},function(err,object){
		object.remove(function(err){
			if(err){
				console.log(err);
				res.status(400)
				   .json({err:err})
			}
			else{
				res.json({deleted:true})
			}
		})
	});
});
// get all mentors
app.get('/mentors',function(req,res){
	Mentor.find({}, function(err, mentors) {
	    if (err) {
	        console.log(err);
	        res.status(400)
	           .json({err:err});
	    } else {
	        res.json(mentors);
	    }
	});
});
// get one mentor
app.get('/mentor/:id',function(req,res){
	Mentor.findOne({'_id':req.params.id}, function(err, User) {
	    if (err) {
	        console.log(err);
	        res.status(400)
	           .json({err:err});
	    } else {
	        res.json(User);
	    }
	});
});
// update mentor
app.put('/mentor/:id',function(req,res){
	var query = {"_id":req.params.id}
	Mentor.update(query,req.body,{},function(err,mentor){
		if(err){
			console.log(err);
			res.status(400)
			   .json({err:err})
		}
		else{
			res.json(mentor);
		}
	});
});
// add mentor
app.post('/mentors',function(req,res){
	var mentor = req.body;
	var newMentor = Mentor(mentor);
		newMentor.save(function(err){
			if(err){
				console.log(err);
				res.status(400)
				   .json({err:err})
			}
			else{
				res.json(mentor)
			}
		})
});
// remove mentor
app.delete('/mentors/:id',function(req,res){
	Mentor.findOne({"_id":req.params.id},function(err,object){
		object.remove(function(err){
			if(err){
				console.log(err);
				res.status(400)
				   .json({err:err})
			}
			else{
				res.json({deleted:true})
			}
		})
	});
});
// get all consultations
app.get('/consultations',function(req,res){
	Consultation.find({}, function(err, consultations) {
	    if (err) {
	        console.log(err);
	        res.status(400)
	           .json({err:err});
	    } else {
	        res.json(consultations);
	    }
	});
});
// get one consultation
app.get('/consultation/:id',function(req,res){
	Consultation.findOne({'_id':req.params.id}, function(err, Consultation) {
	    if (err) {
	        console.log(err);
	        res.status(400)
	           .json({err:err});
	    } else {
	        res.json(Consultation);
	    }
	});
});
// update mentor
app.put('/consultation/:id',function(req,res){
	var query = {"_id":req.params.id}
	Consultation.update(query,req.body,{},function(err,consultation){
		if(err){
			console.log(err);
			res.status(400)
			   .json({err:err})
		}
		else{
			res.json(consultation);
		}
	});
});

// remove consultation
app.delete('/consultation/:id',function(req,res){
	Consultation.findOne({"_id":req.params.id},function(err,object){
		object.remove(function(err){
			if(err){
				console.log(err);
				res.status(400)
				   .json({err:err})
			}
			else{
				res.json({deleted:true})
			}
		})
	});
});




