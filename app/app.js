(function(){ 	
	angular
		.module('myApp', ['auth0', 'angular-storage', 'angular-jwt', 'ngRoute', 'mp.datePicker']);
	angular
		.module('myApp')
		.config( function myAppConfig ($routeProvider, authProvider, $httpProvider, $locationProvider,
	  jwtInterceptorProvider) {
	  $routeProvider
	    .when('/home', {
	      controller: 'HomeCtrl as Ctrl',
	      templateUrl: 'site/partials/home.html',
	      pageTitle: 'Home'
	    })
	    .when('/mentors', {
	      controller: 'MentorCtrl as Ctrl',
	      templateUrl: 'site/partials/mentors.html',
	      pageTitle: 'Mentors'
	    })
	    .when('/login', {
	    	controller: 'LoginCtrl as Ctrl',
	    	templateUrl: 'site/partials/login.html',
	    	pageTitle: 'Admin Login'
	    })
	    .when('/adminDash', {
	      controller: 'AdminDashCtrl as Ctrl',
	      templateUrl: 'site/partials/adminDash.html',
	      pageTitle: 'Admin Dash',
	      requiresLogin: true,
	      resolve:{
	      	Update:function(userSrv){
	      		return userSrv.updateThenGetInfo()
	      			.then(function(data) {
	      				return data;
	      			})
	      	}
	      }
	    })
	    .when('/adminStudents', {
	      controller: 'AdminStudentsCtrl as Ctrl',
	      templateUrl: 'site/partials/adminStudents.html',
	      pageTitle: 'Admin Students',
	      requiresLogin: true,
	      resolve:{
	      	Update:function(userSrv){
	      		return userSrv.updateThenGetInfo()
	      			.then(function(data) {
	      				return data;
	      			})
	      	}
	      }
	    })
	   	.when('/adminMentors', {
	      controller: 'AdminMentorsCtrl as Ctrl',
	      templateUrl: 'site/partials/adminMentors.html',
	      pageTitle: 'Admin Mentors',
	      requiresLogin: true,
	      resolve:{
	      	Update:function(userSrv){
	      		return userSrv.updateThenGetInfo()
	      			.then(function(data) {
	      				return data;
	      			})
	      	}
	      }
	    })
	    .when('/adminAdd', {
	      controller: 'AdminAddCtrl as Ctrl',
	      templateUrl: 'site/partials/adminAdd.html',
	      pageTitle: 'Admin Add',
	      requiresLogin: true
	    })
	    .when('/adminViewAll/:category', {
	      controller: 'AdminViewAllCtrl as Ctrl',
	      templateUrl: 'site/partials/adminViewAll.html',
	      pageTitle: 'Admin View All',
	      requiresLogin: true,
	      resolve:{
	      	Update:function(userSrv){
	      		return userSrv.updateThenGetInfo()
	      			.then(function(data) {
	      				return data;
	      			})
	      	}
	      }
	    })
	    .when('/adminProfile/:type/:id', {
	      controller: 'AdminProfileCtrl as Ctrl',
	      templateUrl: 'site/partials/adminProfile.html',
	      pageTitle: 'Admin Profile',
	      requiresLogin: true,
	      resolve:{
	      	Update:function(userSrv){
	      		return userSrv.updateThenGetInfo()
	      			.then(function(data) {
	      				return data;
	      			})
	      	}
	      }
	    })
	    .otherwise({
	    	redirectTo: '/home'
	    })

		authProvider.init({
	    	domain: 'rmidha2.auth0.com',
	    	clientID: 'Btu7Ywz35Puaf9QYeRMBRIIarUEM1Zz2',
	    	loginUrl: '/login'
		});

		//Called when login is successful
		authProvider.on('loginSuccess', ['$location', 'profilePromise', 'idToken', 'store',
		  function($location, profilePromise, idToken, store) {

		    console.log("Login Success");
		    profilePromise.then(function(profile) {
		      	store.set('profile', profile);
		      	store.set('token', idToken);
		    });

		    $location.path('/adminDash')

		}]);

		//Called when login fails
		authProvider.on('loginFailure', function() {
		  alert("Error");
		});

		//Angular HTTP Interceptor function
		jwtInterceptorProvider.tokenGetter = ['store', function(store) {
		    return store.get('token');
		}];
		//Push interceptor function to $httpProvider's interceptors
		$httpProvider.interceptors.push('jwtInterceptor');


	});

	angular
		.module('myApp')
		.run(['auth', function(auth) {
		// This hooks all auth events to check everything as soon as the app starts
		auth.hookEvents();
		}]);
})();





