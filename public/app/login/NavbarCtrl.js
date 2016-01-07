angular.module('foodTracker').controller('NavbarCtrl', function($scope, $http, mvIdentity, mvAuth, $location) {
 
	$scope.identity = mvIdentity;

	$scope.loginUser = function(username, password){
		mvAuth.authenticateUser(username, password).then(function(success){
			if(success){
				console.log("LOGGED IN");
				$location.path('/calendar');
			}
			else{
				console.log("LOGIN INFO INCORRECT");
			}
		});
  }

  $scope.logoutUser = function(){
  	mvAuth.logoutUser().then(function(){
  		$scope.username = "";
  		$scope.password = "";
  		$location.path('/');
  	})
  }


});


