angular.module('foodTracker').controller('FoodsCtrl', function($scope, $http, mvIdentity, mvFoods, $q) {

  var vm = this;

  //vm.items = [];

  console.log(mvIdentity.currentUser);
  vm.items = mvIdentity.currentUser.foods;

  // $http.get('api/items')
  //   .success(function(user){
  //     vm.items = user.foods;
  //   })
  //   .error(function(data){
  //     console.log("Error: " + data);
  //   });

  vm.onSubmit = addDatabaseItem;
  vm.newItem = {};
  vm.newItemFields = [
    {
      key: 'name',
      type: 'input',
      id: 'add-food-item-name',
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
      id: 'add-food-item-portion',
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
    }
  ];

  function addDatabaseItem(){
    mvFoods.createItem(vm.newItem).then(function(){
      vm.newItem = {};
      vm.items = mvIdentity.currentUser.foods;
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  }

  $scope.deleteDatabaseItem = function(id){
    $http.delete('/api/items/' + id)
      .success(function(data){
        vm.items = data;
        console.log(data);
      })
      .error(function(data){
        console.log("Error: " + data);
      });
  };


});


