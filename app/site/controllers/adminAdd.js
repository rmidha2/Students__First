(function(){
	angular
		.module('myApp')
		.controller('AdminAddCtrl', AdminAddCtrl);

	function AdminAddCtrl ($scope, $location, auth, userSrv, $routeParams) {
		var adminaVm = this;
	
		adminaVm.auth = auth;
		adminaVm.addMentor = addMentor;
		adminaVm.viewAll = viewAll;
		adminaVm.goToProfile = goToProfile;
		adminaVm.goToDash = goToDash;
		adminaVm.goToUsers = goToUsers;
		adminaVm.goToMentors = goToMentors;
		adminaVm.logout = logout;

		function addMentor(){
			var mentor = {
				first: adminaVm.first, 
				last: adminaVm.last,
				email: adminaVm.email,
				school: adminaVm.school,
				year: adminaVm.year,
				status: 'UNASSIGNED',
				student: {},
				consultations: []
			}
			userSrv.addMentor(mentor).then(function(res){
			})
			$location.path('/adminViewAll/Mentors')
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