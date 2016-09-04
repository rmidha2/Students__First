angular.module('midnight', [])

	.directive('midnight', function(){

		return {
			restrict: 'A',
			link: function(scope,el,atts){
				$('#secondNav').midnight()
			}
		}
	})