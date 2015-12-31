angular.module('foodTracker').controller('FoodsCtrl', function($scope, $http, $filter, mvIdentity, mvNotifier, mvFoods, $q, $anchorScroll, $location) {

  var vm = this;
  vm.items = mvIdentity.currentUser.foods;

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

  vm.usdaSearchTerm = "";
  vm.usdaProductId = "";
  vm.usdaSearchResult = [];
  vm.usdaItemPortions = [];

  function addDatabaseItem(){
    mvFoods.createItem(vm.newItem).then(function(){
      vm.newItem = {};
      vm.items = mvIdentity.currentUser.foods;
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };

  $scope.deleteDatabaseItem = function(itemId){
    mvFoods.deleteItem(itemId).then(function(){
      vm.items = mvIdentity.currentUser.foods;
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };

  $scope.editDatabaseItem = function(item){
    mvFoods.editItem(item).then(function(){
      vm.items = mvIdentity.currentUser.foods;
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };

  $scope.usdaSearch = function(term){
    mvFoods.usdaSearch(term).then(function(data){
      vm.usdaItemPortions = [];
      vm.usdaSearchResult = data;
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };

  $scope.usdaSelectItem = function(index, productId){
    var selectedItem = vm.usdaSearchResult[index];
    vm.usdaSearchResult = [];
    vm.usdaSearchResult.push(selectedItem);
    vm.usdaProductId = productId;
    vm.scrollTo('usda-search');
    mvFoods.usdaSelectItem(productId).then(function(data){
      vm.usdaItemPortions = data;
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };
  $scope.usdaSelectPortion = function(index){
    mvFoods.usdaSelectPortion(vm.usdaProductId, index).then(function(data){
      mvFoods.createItem(data).then(function(){
        vm.newItem = {};
        vm.items = mvIdentity.currentUser.foods;
        mvNotifier.notify('Item added to database!');
      }, function(reason){
        console.log("ERROR: " + reason);
      })
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };
  vm.scrollTo = function(id) {
    $location.hash(id);
    $anchorScroll();
  }


});


