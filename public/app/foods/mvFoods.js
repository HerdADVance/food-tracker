angular.module('foodTracker').factory('mvFoods', function($http, mvIdentity, mvUser, $q){
	return{

		createItem: function(item){
			var dfd = $q.defer();
			var userId = mvIdentity.currentUser._id;

			$http.put('/api/users/:' + userId, {_id: userId, item:item}).then(function(response){
				console.log(response);
	      if(response.status == 200){
	      	mvIdentity.currentUser = response.data;
	      	dfd.resolve(true);
	      }
	      else{
	        dfd.resolve(false);
	      }
	    });

			return dfd.promise
		},
		deleteItem: function(item){
			var dfd = $q.defer();
			var userId = mvIdentity.currentUser._id;

			$http.put('/api/users/:' + userId, {_id: userId, item:item}).then(function(response){
				console.log(response);
	      if(response.status == 200){
	      	mvIdentity.currentUser = response.data;
	      	dfd.resolve(true);
	      }
	      else{
	        dfd.resolve(false);
	      }
	    });

			return dfd.promise
		}

	}
});