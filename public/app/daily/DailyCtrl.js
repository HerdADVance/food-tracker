angular.module('foodTracker').controller('DailyCtrl', function($scope, $http, mvIdentity, mvFoods, mvUser, mvDaily, $q) {
 
  var vm = this;

  vm.items = mvIdentity.currentUser.foods;
  vm.meals = mvIdentity.currentUser.meals;

  vm.selectedItems = [];

  vm.theDate = new Date();
  
  vm.calories = 0;
  vm.fat = 0;
  vm.carbs = 0;
  vm.protein = 0;
  vm.sodium = 0;
  vm.fiber = 0;

  vm.dvCalories = 2000;
  vm.dvFat = 65;
  vm.dvCarbs = 300;
  vm.dvProtein = 50;
  vm.dvSodium = 2400;
  vm.dvFiber = 25;

  vm.clearDay = function(){
    vm.selectedItems = [];
  }
  vm.deleteItem = function(index){
    vm.selectedItems.splice(index, 1);
    vm.getNutritionTotals();
  };
  vm.getNutritionTotals = function(){
    vm.calories = 0; 
    vm.fat = 0; 
    vm.carbs = 0;
    vm.protein = 0;
    vm.sodium = 0; 
    vm.fiber = 0;

    for(var i = 0; i < vm.selectedItems.length; i++){
      var item = vm.selectedItems[i];
      vm.calories += (item.calories);
      vm.fat += (item.fat);
      vm.carbs += (item.carbs);
      vm.protein += (item.protein);
      vm.sodium += (item.sodium);
      vm.fiber += (item.fiber);
    }
  };
  vm.saveDay = function(){
    var day = {};
    day.date = vm.theDate;
    day.items = vm.selectedItems;
    day.calories = vm.calories;
    day.fat = vm.fat;
    day.carbs = vm.carbs;
    day.protein = vm.protein;
    day.sodium = vm.sodium;
    day.fiber = vm.fiber;

    mvDaily.createDay(day).then(function(){
      vm.selectedItems = [];
      console.log(mvIdentity.currentUser);
    }, function(reason){
      console.log("ERROR: " + reason);
    })
  };
  vm.selectItem = function(item){
    vm.selectedItems.push(item);
    vm.getNutritionTotals();
  };


});


