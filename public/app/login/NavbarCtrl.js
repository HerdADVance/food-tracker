angular.module('foodTracker').controller('NavbarCtrl', function($scope, $http, mvIdentity, mvAuth) {
 
	$scope.identity = mvIdentity;

	$scope.loginUser = function(username, password){
		mvAuth.authenticateUser(username, password).then(function(success){
			if(success){
				console.log("LOGGED IN");
			}
			else{
				console.log("LOGIN INFO INCORRECT");
			}
		});
  }

});


