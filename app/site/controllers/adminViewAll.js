(function(){
	angular
		.module('myApp')
		.controller('AdminViewAllCtrl', AdminViewAllCtrl);

	function AdminViewAllCtrl ($scope, $location, auth, userSrv, $routeParams, Update) {
		var adminvaVm = this;
	
		adminvaVm.auth = auth; 
		adminvaVm.title = $routeParams.category.split("_").join(" ");
		adminvaVm.sort = sort;
		adminvaVm.changeOrder = changeOrder;
		adminvaVm.viewAll = viewAll;
		adminvaVm.goToProfile = goToProfile;
		adminvaVm.goToDash = goToDash;
		adminvaVm.goToUsers = goToUsers;
		adminvaVm.goToMentors = goToMentors;
		adminvaVm.logout = logout;
		adminvaVm.input = [];

		var page = $routeParams.category	
		var _users;
		var _mentors;
		var _consultations;

		handleUpdate()
		sort()

		function handleUpdate(){
			var users = Update.users;
			var mentors = Update.mentors;
			var consultations = Update.consultations;
			
			for (var i = 0; i < users.length; i++) {
				var replace = users[i].firstChoice.replace(/\s*\(.*?\)\s*/g, '')
				users[i].firstChoice = replace
		    	var lowercase = users[i].status.toLowerCase()
		    	users[i].status = lowercase
		    	var schoolColors = users[i].firstChoice.split(' ').join('_')
		    	users[i].schoolColors = schoolColors			    	
			}

			for (var i = 0; i < mentors.length; i++) {
		    	var lowercase = mentors[i].status.toLowerCase()
		    	mentors[i].status = lowercase
		    	var schoolColors = mentors[i].school.split(' ').join('_')
		    	mentors[i].schoolColors = schoolColors
		    }

		    for (var i = 0; i < consultations.length; i++) {
				var replace = consultations[i].school.replace(/\s*\(.*?\)\s*/g, '')
				consultations[i].school = replace
				var lowercase = consultations[i].status.toLowerCase()
		    	consultations[i].status = lowercase
				var schoolColors = consultations[i].school.split(' ').join('_')
		    	consultations[i].schoolColors = schoolColors
			}

			_users = users;
			_mentors = mentors;
			_consultations = consultations;
		}

		function sort(){
			if (page === 'Students') {
				adminvaVm.input = _users;
				adminvaVm.inputType = 'student'
			}

			else if (page === 'Mentors') {
				adminvaVm.input = _mentors
				adminvaVm.inputType = 'mentor'
			}

			else if (page === 'Consultations') {
				adminvaVm.input = _consultations
				adminvaVm.inputType = 'consultation'
			}
		}

		function changeOrder(){
			if (page === 'Students') {
				adminvaVm.schoolChoice = 'firstChoice'
			}
			else if (page === 'Mentors' || page === 'Consultations') {
				adminvaVm.schoolChoice = 'school'
			}
			adminvaVm.order = adminvaVm.selected
		}

		function viewAll(res){
			$location.path('/adminViewAll/'+res)
		}	

		function goToProfile(type,id){
			$location.path('/adminProfile/'+type+'/'+id)
		}

		function goToDash(){
			$location.path('/adminDash')
		}

		function goToUsers(){
			$location.path('/adminStudents')
		}

		function goToMentors(){
			$location.path('/adminMentors')
		}

		function logout(){
			auth.signout();
			// store.remove('profile');
			// store.remove('token');
			$location.path('/login');
		}
	}
})()
