angular.module('foodTracker').factory('mvIdentity', function(){
	return{
		currentUser: undefined,
		isAuthenticated: function(){
			return !!this.currentUser;
		}
	}
})