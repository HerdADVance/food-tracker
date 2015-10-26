foodTracker.controller('ItemCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.items = [
		{name: "Banana", portion: "1 medium", quantity: 1, calories: 50, fat: 10, carbs: 10, protein: 10, sodium: 50, fiber: 10}
	]

	$scope.selectedItems = [];

	$scope.calories = 0;
	$scope.fat = 0;
	$scope.carbs = 0;
	$scope.protein = 0;
	$scope.sodium = 0;
	$scope.fiber = 0;

  var vm = this;
  vm.onSubmit = addDatabaseItem;
  vm.newItem = {};
  vm.newItemFields = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Name',
        placeholder: 'e.g. Banana',
        required: true
      }
    },
    {
      key: 'portion',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Portion',
        placeholder: 'e.g. 4oz or 1 medium'
      }
    },
    {
      key: 'calories',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Calories',
        placeholder: 'kCal'
      }
    },
    {
      key: 'fat',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Fat',
        placeholder: 'g'
      }
    },
    {
      key: 'carbs',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Carbs',
        placeholder: 'g'
      }
    },
    {
      key: 'protein',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Protein',
        placeholder: 'g'
      }
    },
    {
      key: 'sodium',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Sodium',
        placeholder: 'mg'
      }
    },
    {
      key: 'fiber',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Fiber',
        placeholder: 'g',
        default: 0
      }
    },
    {
      key: 'addToList',
      type: 'input',
      templateOptions: {
        type: 'checkbox',
        label: 'Add To List?'
      }
    }
  ];

  function addDatabaseItem() {
  	$scope.items.push(vm.newItem);
  	if(vm.newItem.addToList){
  		$scope.selectItem(vm.newItem);
  	}
  	vm.newItem = {};
    //alert(JSON.stringify(vm.newItem), null, 2);
  }

  $scope.deleteDatabaseItem = function(index){
  	$scope.items.splice(index, 1);
  }

  $scope.selectItem = function(item){
  	$scope.selectedItems.push(item);
  	getNutritionTotals();
  }

  $scope.deleteItem = function(index){
  	$scope.selectedItems.splice(index, 1);
  	getNutritionTotals();
  }

  

  getNutritionTotals = function(){
    $scope.calories = 0; 
    $scope.fat = 0; 
    $scope.carbs = 0;
    $scope.protein = 0;
    $scope.sodium = 0; 
    $scope.fiber = 0;

    for(var i = 0; i < $scope.selectedItems.length; i++){
        var item = $scope.selectedItems[i];
        $scope.calories += (item.calories);
        $scope.fat += (item.fat);
        $scope.carbs += (item.carbs);
        $scope.protein += (item.protein);
        $scope.sodium += (item.sodium);
        $scope.fiber += (item.fiber);
    }
	};


}]);


