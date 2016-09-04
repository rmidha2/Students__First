(function(){
	angular
		.module('myApp')
		.controller('LoginCtrl', LoginCtrl);

	function LoginCtrl($scope,$location,auth) {
		var loginVm = this;

		loginVm.auth = auth;
	}
})();