(function(){
	angular
		.module('myApp')
		.controller('AdminDashCtrl', AdminDashCtrl);

	function AdminDashCtrl ($scope, $location, auth, userSrv, Update) {
		var adminVm = this;
		
		adminVm.auth = auth;
		adminVm.users;
		adminVm.mentors = userSrv.mentors;
		adminVm.consultations = userSrv.consultations;
		adminVm.viewAll = viewAll;
		adminVm.goToAdd = goToAdd;
		adminVm.goToProfile = goToProfile;
		adminVm.goToDash = goToDash;
		adminVm.goToUsers = goToUsers;
		adminVm.goToMentors = goToMentors;
		adminVm.logout = logout;

		handleUpdate()

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

			adminVm.users = users;
			adminVm.mentors = mentors;
			adminVm.consultations = consultations;
		}

		function viewAll(res){
			$location.path('/adminViewAll/'+res)
		}

		function goToAdd(){
			$location.path('/adminAdd')
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
			$location.path('/login');
		}
	}
})()
