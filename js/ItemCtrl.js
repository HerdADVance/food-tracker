foodTracker.controller('ItemCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.items =[

		{name: "Banana", portion: "1 medium", quantity: 1, calories: 50, fat: 10, carbs: 10, protein: 10, sodium: 50, fiber: 10}

	]

	$scope.addItem = function() {
		console.log("ITEM ADDED");
		items.push
    //this.todos.unshift({ completed: false, val: this.newTask });
    //this.newTask = '';
  };


}]);