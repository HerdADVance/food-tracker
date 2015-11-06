foodTracker.controller('ItemCtrl', ['$scope', '$http', function($scope, $http) {
 
  $scope.items = [];
  $scope.selectedItems = [];

  $http.get('api/items')
    .success(function(data){
      $scope.items = data;
    })
    .error(function(data){
      console.log("Error: " + data);
    });

  $scope.calories = 0;
  $scope.fat = 0;
  $scope.carbs = 0;
  $scope.protein = 0;
  $scope.sodium = 0;
  $scope.fiber = 0;

  $scope.dvCalories = 2000;
  $scope.dvFat = 65;
  $scope.dvCarbs = 300;
  $scope.dvProtein = 50;
  $scope.dvSodium = 2400;
  $scope.dvFiber = 25;

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
        type: 'decimal',
        label: 'Calories',
        placeholder: 'kcal'
      }
    },
    {
      key: 'fat',
      type: 'input',
      templateOptions: {
        type: 'decimal',
        label: 'Fat',
        placeholder: 'g'
      }
    },
    {
      key: 'carbs',
      type: 'input',
      templateOptions: {
        type: 'decimal',
        label: 'Carbs',
        placeholder: 'g'
      }
    },
    {
      key: 'protein',
      type: 'input',
      templateOptions: {
        type: 'decimal',
        label: 'Protein',
        placeholder: 'g'
      }
    },
    {
      key: 'sodium',
      type: 'input',
      templateOptions: {
        type: 'decimal',
        label: 'Sodium',
        placeholder: 'mg'
      }
    },
    {
      key: 'fiber',
      type: 'input',
      templateOptions: {
        type: 'decimal',
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
    if(vm.newItem.addToList){
      $scope.selectItem(vm.newItem);
    }
    persistItem(vm.newItem);
    vm.newItem = {};
  }

  persistItem = function(item){
    $http.post('/api/items', item)
      .success(function(data){
        $scope.items = data;
        console.log(data);
      })
      .error(function(data){
        console.log("Error: " + data);
      });
  };

  $scope.deleteDatabaseItem = function(id){
    $http.delete('/api/items/' + id)
      .success(function(data){
        $scope.items = data;
        console.log(data);
      })
      .error(function(data){
        console.log("Error: " + data);
      });
  };

  $scope.selectItem = function(item){
    $scope.selectedItems.push(item);
    getNutritionTotals();
  };

  $scope.deleteItem = function(index){
    $scope.selectedItems.splice(index, 1);
    getNutritionTotals();
  };

  

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


