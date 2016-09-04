(function(){

	angular
		.module('myApp')
		.service('userSrv',UserService);

	function UserService($location,api, $q){
		var self = this;
		//public functions
		self.updateData = updateData;
		self.getUser = getUser;
		self.removeUser = removeUser;
		self.updateUser = updateUser;
		self.getMentor = getMentor;
		self.updateMentor = updateMentor;
		self.addMentor = addMentor;
		self.removeMentor = removeMentor;
		self.getConsultation = getConsultation;
		self.updateConsultation = updateConsultation;
		self.removeConsultation = removeConsultation;

		self.updateThenGetInfo = updateThenGetInfo;

		function updateThenGetInfo() {
			return api.request('/updateData', {}, 'GET')
			.then(function(res) {
				// create custom promise
				var deferred = $q.defer();		
				// create object that will be resolved
				var data = {
					users: null,
					mentors: null,
					consulations: null
				};

				// trying to get all data
				api.request('/users',{},'GET')
					.then(function(res) {
						data.users = res.data
						return api.request('/mentors',{},'GET')
					})
					.then(function(res) {
						data.mentors = res.data
						return api.request('/consultations', {}, 'GET')
					})
					.then(function(res) {
						data.consultations = res.data
						// resolve the promise with data
						deferred.resolve(data)
						// deferred.reject('error')
					})

				// return that promise
				return deferred.promise
			})
		}

		function updateData(){
			return api.request('/updateData',{},'GET')
			.then(function(res){
				return res;
			})
		}

		function getUser(userId){
			return api.request('/user/'+userId,{},'GET')
			.then(function(res){
				//success callback
				return res.data
			},function(res){
				//error callback
				return;
			})
		}

		function updateUser(userId,user){
			return api.request('/user/'+userId,user,'PUT')
			.then(function(res){
			})
		}

		function removeUser(userId){
			return api.request('/user/'+userId,{},'DEL')
			.then(function(res){
			})
		}

		function getMentor(mentorId){
			return api.request('/mentor/'+mentorId,{},'GET')
			.then(function(res){
				//success callback
				return res.data
			},function(res){
				//error callback
				return;
			})
		}

		function updateMentor(mentorId,mentor){
			return api.request('/mentor/'+mentorId,mentor,'PUT')
			.then(function(res){
			})
		}

		function addMentor(mentor){
			console.log(mentor)
			return api.request('/mentors',mentor,'POST')
			.then(function(res){
			})
		}

		function removeMentor(mentorId){
			return api.request('/mentors/'+mentorId,{},'DEL')
			.then(function(res){
			})
		}

		function getConsultation(Id){
			return api.request('/consultation/'+Id,{},'GET')
			.then(function(res){
				//success callback
				return res.data
			},function(res){
				//error callback
				return;
			})
		}

		function updateConsultation(Id,consultation){
			return api.request('/consultation/'+Id,consultation,'PUT')
			.then(function(res){
			})
		}

		function removeConsultation(Id){
			return api.request('/consultation/'+Id,{},'DEL')
			.then(function(res){
			})
		}

	}
})();