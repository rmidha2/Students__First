(function(){
	angular
		.module('myApp')
		.controller('AdminMentorsCtrl', AdminMentorsCtrl);

	function AdminMentorsCtrl ($scope, $location, auth, userSrv, Update) {
		var adminmVm = this;
		
		adminmVm.auth = auth;
		adminmVm.users = [];
		adminmVm.mentors = [];
		adminmVm.changeOrder = changeOrder;
		adminmVm.goToProfile = goToProfile;
		adminmVm.viewAll = viewAll;
		adminmVm.goToDash = goToDash;
		adminmVm.goToUsers = goToUsers;
		adminmVm.goToMentors = goToMentors;
		adminmVm.logout = logout;

		handleUpdate()

		function handleUpdate(){
			var users = Update.users;
			var mentors = Update.mentors;
			
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

			adminmVm.users = users;
			adminmVm.mentors = mentors;
		}
	
		function viewAll(res){
			$location.path('/adminViewAll/'+res)
		}

		function changeOrder(){
			adminmVm.order = adminmVm.selected
		}

		function goToDash(){
			$location.path('/adminDash')
		}

		function goToProfile(type,id){
			$location.path('/adminProfile/'+type+'/'+id)
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