angular.module('foodTracker').factory('mvDaily', function($http, mvIdentity, mvUser, $q){
	return{

		createDay: function(day){
			var dfd = $q.defer();
			var userId = mvIdentity.currentUser._id;

			$http.put('/api/days/post/:' + userId, {_id: userId, day: day}).then(function(response){
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
		// deleteDay: function(itemId){
		// 	var dfd = $q.defer();
		// 	var userId = mvIdentity.currentUser._id;

		// 	$http.put('/api/days/delete/:' + itemId, {userId: userId, itemId: itemId}).then(function(response){
	 //      if(response.status == 200){
	 //      	mvIdentity.currentUser = response.data;
	 //      	dfd.resolve(true);
	 //      }
	 //      else{
	 //        dfd.resolve(false);
	 //      }
	 //    });

		// 	return dfd.promise
		// },
		// editDay: function(item){
		// 	var dfd = $q.defer();
		// 	var userId = mvIdentity.currentUser._id;

		// 	$http.put('/api/days/put/:' + item._id, {userId: userId, item: item}).then(function(response){
	 //      if(response.status == 200){
	 //      	mvIdentity.currentUser = response.data;
	 //      	dfd.resolve(true);
	 //      }
	 //      else{
	 //        dfd.resolve(false);
	 //      }
	 //    });

		// 	return dfd.promise
		// }

	}
});