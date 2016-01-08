angular.module('foodTracker').factory('mvFoods', function($http, mvIdentity, mvUser, $q){
	return{

		createItem: function(item){
			var dfd = $q.defer();
			var userId = mvIdentity.currentUser._id;

			$http.put('/api/foods/post/:' + userId, {_id: userId, item:item}).then(function(response){
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
		deleteItem: function(itemId){
			var dfd = $q.defer();
			var userId = mvIdentity.currentUser._id;

			$http.put('/api/foods/delete/:' + itemId, {userId: userId, itemId: itemId}).then(function(response){
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
		editItem: function(item){
			var dfd = $q.defer();
			var userId = mvIdentity.currentUser._id;

			$http.put('/api/foods/put/:' + item._id, {userId: userId, item: item}).then(function(response){
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
		usdaSearch: function(term){
			var dfd = $q.defer();
			var usdaKey = 'Yt5Co9wzddDmE1a6aISsxs7H6cTdNjMG4h0eXLhI';

			$http.get('https//api.nal.usda.gov/ndb/search/?format=json&q=' + term + '&sort=n&max=100&offset=0&api_key=' + usdaKey).then(function(response){
	      if(response.status == 200){
	      	var usdaSearchResult = response.data.list.item;
	      	dfd.resolve(usdaSearchResult);
	      }
	      else{
	        dfd.resolve(false);
	      }
	    });

			return dfd.promise;
		},
		usdaSelectItem: function(productId){
			var dfd = $q.defer();
			var usdaKey = 'Yt5Co9wzddDmE1a6aISsxs7H6cTdNjMG4h0eXLhI';
			var usdaItemPortions= [];

			$http.get('https//api.nal.usda.gov/ndb/reports/?ndbno=' + productId + '&type=f&format=json&api_key=' + usdaKey).then(function(response){
	      if(response.status == 200){
	      	for(i=0; i<response.data.report.food.nutrients[0].measures.length; i++){
	      		usdaItemPortions.push(response.data.report.food.nutrients[0].measures[i]);
	      	}
	      	dfd.resolve(usdaItemPortions);
	      }
	      else{
	        dfd.resolve(false);
	      }
	    });

			return dfd.promise;
		},
		usdaSelectPortion: function(productId, index){
			var dfd = $q.defer();
			var usdaKey = 'Yt5Co9wzddDmE1a6aISsxs7H6cTdNjMG4h0eXLhI';

			$http.get('https://api.nal.usda.gov/ndb/reports/?ndbno=' + productId + '&type=f&format=json&api_key=' + usdaKey).then(function(response){
	      if(response.status == 200){
	      	var newItem = {};
	      	var food = response.data.report.food;
	      	
	      	newItem.name = food.name
	      	newItem.portion = food.nutrients[0].measures[index].qty + " " + food.nutrients[0].measures[index].label;
	      	newItem.calories = food.nutrients[1].measures[index].value;
	      	newItem.protein = food.nutrients[3].measures[index].value;
	      	newItem.fat = food.nutrients[4].measures[index].value;
	      	newItem.carbs = food.nutrients[6].measures[index].value;
	      	newItem.fiber = food.nutrients[7].measures[index].value;

	      	for(i=8; i<food.nutrients.length-8; i++){
	      		if(food.nutrients[i].nutrient_id == 307){
	      			newItem.sodium = food.nutrients[i].measures[index].value;
	      			break;
	      		}
	      	}

	      	dfd.resolve(newItem);
	      }
	      else{
	        dfd.resolve(false);
	      }
	    });

			return dfd.promise;
		}

	}
});