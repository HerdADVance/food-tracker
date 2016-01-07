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

  vm.editState = -2;
  vm.oldIndex;

  vm.editedItem = {};
  vm.itemCopy = {};

  function addDatabaseItem(){
    mvFoods.createItem(vm.newItem).then(function(){
      vm.newItem = {};
      vm.items = mvIdentity.currentUser.foods;
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };
  vm.deleteDatabaseItem = function(itemId){
    mvFoods.deleteItem(itemId).then(function(){
      vm.editState = -2;
      vm.items = mvIdentity.currentUser.foods;
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };
  vm.editCancel = function(item){
    vm.editState = -2;
    var cancelIndex = vm.items.indexOf(item);
    vm.items[cancelIndex] = vm.itemCopy;
  };
  vm.editSave = function(){
    var editedItem = vm.items[vm.oldIndex];
    mvFoods.editItem(editedItem).then(function(){
      vm.items = mvIdentity.currentUser.foods;
      vm.editState = -2;
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };
  vm.editItem = function(item, index){
    if(vm.editState != -2){
      console.log(vm.oldIndex);
      vm.items[vm.oldIndex] = vm.itemCopy;
    }
    vm.editState = index;
    vm.oldIndex = vm.items.indexOf(item);
    vm.itemCopy = angular.copy(vm.items[vm.oldIndex]);
  };
  vm.usdaSearch = function(term){
    mvFoods.usdaSearch(term).then(function(data){
      vm.usdaItemPortions = [];
      vm.usdaSearchResult = data;
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };

  vm.usdaSelectItem = function(index, productId){
    var selectedItem = vm.usdaSearchResult[index];
    vm.usdaSearchResult = [];
    vm.usdaSearchResult.push(selectedItem);
    vm.usdaProductId = productId;
    mvFoods.usdaSelectItem(productId).then(function(data){
      vm.usdaItemPortions = data;
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };
  vm.usdaSelectPortion = function(index){
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
  // vm.scrollTo = function(id) {
  //   $location.hash(id);
  //   $anchorScroll();
  // }


});


foodTracker.directive('modelChangeBlur', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
      link: function(scope, elm, attr, ngModelCtrl) {
      if (attr.type === 'radio' || attr.type === 'checkbox') return;

      elm.unbind('input').unbind('keydown').unbind('change');
      elm.bind('blur', function() {
        scope.$apply(function() {
            ngModelCtrl.$setViewValue(elm.val());
        });         
      });
    }
  };
});
foodTracker.directive('scrollToItem', function() {                                                      
    return {                                                                                 
        restrict: 'A',                                                                       
        scope: {                                                                             
            scrollTo: "@"                                                                    
        },                                                                                   
        link: function(scope, $elm,attr) {                                                   

            $elm.on('click', function() {                                                    
                $('html,body').animate({scrollTop: $(scope.scrollTo).offset().top }, "slow");
            });                                                                              
        }                                                                                    
    }}) 