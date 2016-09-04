(function(){
	angular
		.module('myApp')
		.controller('AdminProfileCtrl', AdminProfileCtrl);

	function AdminProfileCtrl ($scope, $location, auth, userSrv, $routeParams, Update) {
		var adminpVm = this;
	
		adminpVm.auth = auth;
		adminpVm.mentors = [];
		adminpVm.profile = {};
		adminpVm.edit = false;
		adminpVm.student = false;
		adminpVm.getProfile = getProfile;
		adminpVm.getUser = getUser;
		adminpVm.getMentor = getMentor;
		adminpVm.getConsultation = getConsultation;
		adminpVm.acceptAssign = '';
		adminpVm.assignMentor = '';
		adminpVm.update = update;
		adminpVm.selectMentor = selectMentor;
		adminpVm.renderClicked = renderClicked;
		adminpVm.editMentor = editMentor
		adminpVm.remove = remove;
		adminpVm.goToProfile = goToProfile;
		adminpVm.viewAll = viewAll;
		adminpVm.goToDash = goToDash;
		adminpVm.goToUsers = goToUsers;
		adminpVm.goToMentors = goToMentors;
		adminpVm.goToConsultations = goToConsultations;
		adminpVm.logout = logout;
		adminpVm.date = date;
		adminpVm.parseDate = parseDate;
		adminpVm.showCal = false;

		handleUpdate()

		function handleUpdate(){
			var mentors = Update.mentors;

			for (var i = 0; i < mentors.length; i++) {
		    	var lowercase = mentors[i].status.toLowerCase()
		    	mentors[i].status = lowercase
		    	var schoolColors = mentors[i].school.split(' ').join('_')
		    	mentors[i].schoolColors = schoolColors
		    }

			adminpVm.mentors = mentors;
		}

		function date(date){
			function pad(n) {
        	return n < 10 ? '0' + n : n;
    		}

    		return date && date.getFullYear()
        	+ '-' + pad(date.getMonth() + 1)
        	+ '-' + pad(date.getDate());
		}

		function parseDate(s){
    		var tokens = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);

    		return tokens && new Date(tokens[1], tokens[2] - 1, tokens[3]);			
		}

		var mentor;
		var back;

		getProfile($routeParams.type, $routeParams.id)

		function getProfile(type,id){

			if (type === 'student') {
				getUser(id).then(function(res){
					adminpVm.acceptAssign = 'ACCEPTED'
					adminpVm.assignMentor = 'unassigned'
					adminpVm.student = true;
					adminpVm.profile = res
					if (adminpVm.profile.status == 'GRADUATED') {
						adminpVm.profile.disable = true
					}
					else {
						adminpVm.profile.disable = false
					}
					back = 'Students'
				})		
			}
			else if (type === 'mentor') {
				getMentor(id).then(function(res){
					adminpVm.acceptAssign = 'UNASSIGNED'
					adminpVm.profile = res
					adminpVm.profile.disable = false
					back = 'Mentors'
				})
			}
			else if (type === 'consultation') {
				getConsultation(id).then(function(res){
					adminpVm.acceptAssign = 'SCHEDULED'
					adminpVm.assignMentor = '!applied'
					adminpVm.profile = res
					if (adminpVm.profile.status == 'COMPLETED') {
						adminpVm.profile.disable = true
					}
					else {
						adminpVm.profile.disable = false
					}
					back = 'Consultations'
				})
			}
		}

		function getUser(id){
			return userSrv.getUser(id).then(function(user){
				return user
			})
		}

		function getMentor(id){
			return userSrv.getMentor(id).then(function(mentor){
				return mentor
			})
		}

		function getConsultation(id){
			return userSrv.getConsultation(id).then(function(consultation){
				return consultation
			})
		}

		function update(id){

			if ($routeParams.type === 'student' && adminpVm.profile.mentor !== undefined && (adminpVm.profile.status === 'ACCEPTED' || adminpVm.profile.status == 'GRADUATED')) {

				if (adminpVm.profile.status == 'GRADUATED') {
					var updatePrevMentor = {
						student: {},
						status: 'UNASSIGNED'
					}
					var update = {
						status: adminpVm.profile.status,
						email: adminpVm.profile.email,
						grade: adminpVm.profile.grade,
						firstChoice: adminpVm.profile.firstChoice,
						secondChoice: adminpVm.profile.secondChoice,
						thirdChoice: adminpVm.profile.thirdChoice 
					}
					userSrv.updateMentor(adminpVm.profile.mentor.id,updatePrevMentor)
					userSrv.updateUser(id,update)
				}

				else if (mentor !== undefined) {
					var updatePrevMentor = {
						student: {},
						status: 'UNASSIGNED'
					}
					var update = {
						status: adminpVm.profile.status,
						email: adminpVm.profile.email,
						grade: adminpVm.profile.grade,
						firstChoice: adminpVm.profile.firstChoice,
						secondChoice: adminpVm.profile.secondChoice,
						thirdChoice: adminpVm.profile.thirdChoice,
						mentor: {
							id: mentor._id,
							name: mentor.first+' '+mentor.last 
						}  
					}
					var updateMentor = {
						student: adminpVm.profile,
						status: 'ASSIGNED'
					}
					userSrv.updateMentor(adminpVm.profile.mentor.id,updatePrevMentor)
					userSrv.updateUser(id,update)
					userSrv.updateMentor(mentor._id,updateMentor)
				}
				else {
					var update = {
					status: adminpVm.profile.status,
					email: adminpVm.profile.email,
					grade: adminpVm.profile.grade,
					firstChoice: adminpVm.profile.firstChoice,
					secondChoice: adminpVm.profile.secondChoice,
					thirdChoice: adminpVm.profile.thirdChoice 
					}
					userSrv.updateUser(id,update)
				}
			}
			else if ($routeParams.type === 'student' && mentor !== undefined && adminpVm.profile.status === 'ACCEPTED') {
				var update = {
					status: adminpVm.profile.status,
					email: adminpVm.profile.email,
					grade: adminpVm.profile.grade,
					firstChoice: adminpVm.profile.firstChoice,
					secondChoice: adminpVm.profile.secondChoice,
					thirdChoice: adminpVm.profile.thirdChoice,
					mentor: {
						id: mentor._id,
						name: mentor.first+' '+mentor.last 
					}  
				}
				var updateMentor = {
					student: adminpVm.profile,
					status: 'ASSIGNED'
				}
				userSrv.updateUser(id,update)
				userSrv.updateMentor(mentor._id,updateMentor)			
			}

			else if ($routeParams.type === 'student' && mentor == undefined && adminpVm.profile.status === 'ACCEPTED') {
				var update = {
					status: adminpVm.profile.status,
					email: adminpVm.profile.email,
					grade: adminpVm.profile.grade,
					firstChoice: adminpVm.profile.firstChoice,
					secondChoice: adminpVm.profile.secondChoice,
					thirdChoice: adminpVm.profile.thirdChoice 
				}
				userSrv.updateUser(id,update)
			}		

			else if ($routeParams.type === 'mentor') {
				var update = {
					status: adminpVm.profile.status,
					email: adminpVm.profile.email,
					year: adminpVm.profile.year,
					school: adminpVm.profile.school
				}
				userSrv.updateMentor(id,update)
			}

			else if ($routeParams.type === 'consultation') {

				if (adminpVm.profile.status === 'SCHEDULED' && adminpVm.profile.mentor !== undefined && mentor !== undefined) {
					var date = adminpVm.profile.mentor.date
					userSrv.getMentor(adminpVm.profile.mentor.id).then(function(res){
						var consultationsArr = res.consultations

						for (var i = 0; i < consultationsArr.length; i++) {
							if (consultationsArr[i].id == adminpVm.profile._id) {
								consultationsArr.splice(0,1)
							}							
						}
						var updatePrevMentor = {
							consultations: consultationsArr 
						}
						userSrv.updateMentor(adminpVm.profile.mentor.id,updatePrevMentor)
					})

					if (typeof adminpVm.date.length == String) {
						date = adminpVm.date
					}

					var update = {
						status: adminpVm.profile.status,
						email: adminpVm.profile.email,
						grade: adminpVm.profile.grade,
						school: adminpVm.profile.school,
						mentor: {
							id: mentor._id,
							name: mentor.first+' '+mentor.last,
							date: date
						}
					}
					userSrv.getMentor(mentor._id).then(function(res){
						var replace = adminpVm.profile.school.replace(/\s*\(.*?\)\s*/g, '')
						var lowercase = adminpVm.profile.status.toLowerCase()
						var schoolColors =	replace.split(' ').join('_')
						updatedConsultations = res.consultations
						updatedConsultations.push({id: adminpVm.profile._id,name: adminpVm.profile.first+' '+adminpVm.profile.last,status: lowercase,school: replace, schoolColors: schoolColors,date: date})
						var updateMentor = {
							consultations: updatedConsultations
						}
						userSrv.updateMentor(mentor._id,updateMentor)
					})
					userSrv.updateConsultation(id,update)
				}

				else if (adminpVm.profile.status === 'SCHEDULED' && adminpVm.profile.mentor !== undefined && mentor == undefined) {
					userSrv.getMentor(adminpVm.profile.mentor.id).then(function(res){
						var consultationsArr = res.consultations

						for (var i = 0; i < consultationsArr.length; i++) {
							if (consultationsArr[i].id == adminpVm.profile._id) {
								consultationsArr[i].date = adminpVm.date
							}							
						}
						var updatePrevMentor = {
							consultations: consultationsArr 
						}
						userSrv.updateMentor(adminpVm.profile.mentor.id,updatePrevMentor)
					})
					var update = {
						status: adminpVm.profile.status,
						email: adminpVm.profile.email,
						grade: adminpVm.profile.grade,
						school: adminpVm.profile.school,
						mentor: {
							id: adminpVm.profile.mentor.id,
							name: adminpVm.profile.mentor.name,
							date: adminpVm.date, 
						}
					}
					userSrv.updateConsultation(id,update)
				}

				else if (adminpVm.profile.status === 'SCHEDULED') {
					var updatedConsultations;
					var update = {
						status: adminpVm.profile.status,
						email: adminpVm.profile.email,
						grade: adminpVm.profile.grade,
						school: adminpVm.profile.school,
						mentor: {
							id: mentor._id,
							name: mentor.first+' '+mentor.last,
							date: adminpVm.date 
						}
					}
					userSrv.getMentor(mentor._id).then(function(res){
						var replace = adminpVm.profile.school.replace(/\s*\(.*?\)\s*/g, '')
						var lowercase = adminpVm.profile.status.toLowerCase()
						var schoolColors =	replace.split(' ').join('_')
						updatedConsultations = res.consultations
						updatedConsultations.push({id: adminpVm.profile._id,name: adminpVm.profile.first+' '+adminpVm.profile.last,status: lowercase,school: replace, schoolColors: schoolColors,date: adminpVm.date})
						var updateMentor = {
							consultations: updatedConsultations
						}
						userSrv.updateMentor(mentor._id,updateMentor)
					})
					userSrv.updateConsultation(id,update)
				}
				else if (adminpVm.profile.status === 'COMPLETED') {
					userSrv.getMentor(adminpVm.profile.mentor.id).then(function(res){
						var consultationsArr = res.consultations
						for (var i = 0; i < consultationsArr.length; i++) {
							if (consultationsArr[i].id == adminpVm.profile._id) {
								consultationsArr[i].status = 'completed'
							}							
						}
						var update = {
							consultations: consultationsArr
						}
						userSrv.updateMentor(adminpVm.profile.mentor.id,update)
					})


					var update = {
							status: adminpVm.profile.status,
							email: adminpVm.profile.email,
							grade: adminpVm.profile.grade,
							school: adminpVm.profile.school
						}
					userSrv.updateConsultation(id,update)
				}
				else {
					var update = {
							status: adminpVm.profile.status,
							email: adminpVm.profile.email,
							grade: adminpVm.profile.grade,
							school: adminpVm.profile.school
						}
					userSrv.updateConsultation(id,update)
				}	
			}
			else {
				var update = {
						status: adminpVm.profile.status,
						email: adminpVm.profile.email,
						grade: adminpVm.profile.grade,
						school: adminpVm.profile.school
					}
				userSrv.updateUser(id,update)
			}	
			$location.path('/adminViewAll/'+back)
		}

		function selectMentor(res){
			adminpVm.showCal = true
			mentor = res
			console.log(mentor)
		}

		function editMentor(){
			if (adminpVm.edit === false) {
				adminpVm.edit = true
			}
			else {
				adminpVm.edit = false
			}
		}

		function renderClicked(id){
			adminpVm.clicked = id
		}

		function remove(id){
			if ($routeParams.type === 'student') {
				if (adminpVm.profile.mentor !== undefined) {
					var updatePrevMentor = {
						student: {},
						status: 'UNASSIGNED'
					}
					userSrv.updateMentor(adminpVm.profile.mentor.id,updatePrevMentor)
				}
				userSrv.removeUser(id).then(function(res){
				})		
			}
			else if ($routeParams.type === 'mentor') {
				if (adminpVm.profile.student !== undefined) {
					var updateStudent = {
						mentor: {}
					}
					userSrv.updateUser(adminpVm.profile.student._id,updateStudent)
				}
				userSrv.removeMentor(id).then(function(res){
				})
			}
			else if ($routeParams.type === 'consultation') {
				userSrv.removeConsultation(id).then(function(res){
				})
			}

			$location.path('/adminViewAll/'+back)
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

		function goToConsultations(){
			$location.path('/adminConsultations')
		}

		function logout(){
			auth.signout();
			// store.remove('profile');
			// store.remove('token');
			$location.path('/login');
		}
	}
})()