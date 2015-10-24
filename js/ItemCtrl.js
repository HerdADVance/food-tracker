foodTracker.controller('ItemCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.items = [
		{name: "Banana", portion: "1 medium", quantity: 1, calories: 50, fat: 10, carbs: 10, protein: 10, sodium: 50, fiber: 10}
	]

	$scope.selectedItems = [];

  var vm = this;
  vm.onSubmit = onSubmit;
  vm.newItem = {};
  vm.newItemFields = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Name',
        required: true
      }
    },
    {
      key: 'portion',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Portion'
      }
    },
    {
      key: 'calories',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Calories'
      }
    },
    {
      key: 'fat',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Fat'
      }
    },
    {
      key: 'carbs',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Carbs'
      }
    },
    {
      key: 'protein',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Protein'
      }
    },
    {
      key: 'sodium',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Sodium'
      }
    },
    {
      key: 'fiber',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Fiber'
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

  function onSubmit() {
  	$scope.items.push(vm.newItem);
  	if(vm.newItem.addToList){
  		$scope.selectedItems.push(vm.newItem);
  	}
  	vm.newItem = {};
    //alert(JSON.stringify(vm.newItem), null, 2);
  }

  $scope.selectItem = function(item){
  	$scope.selectedItems.push(item);
  }

  $scope.deleteItem = function(index){
  	$scope.selectedItems.splice(index, 1);
  }


}]);


