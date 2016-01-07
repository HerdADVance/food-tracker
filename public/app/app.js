var foodTracker = angular.module('foodTracker', ['formly', 'formlyBootstrap', 'ngResource', 'ngRoute', 'xeditable']);

angular.module('foodTracker').config(function($routeProvider, $locationProvider){
	// var routeRoleChecks = {
	// 	admin: {auth: function(mvAuth){
	// 		return mvAuth.authorizeCurrentUserForRoute('admin')
	// 	}},
	// 	admin: {auth: function(mvAuth){
	// 		return mvAuth.authorizeAuthenticatedUserForRoute()
	// 	}}
	// }

	$locationProvider.html5Mode({
		enabled: true
	});
	$routeProvider
		.when('/', {templateUrl: '/partials/welcome/welcome', controller:'SignupCtrl'})
		.when('/calendar', {templateUrl: '/partials/calendar/calendar', controller:'CalendarCtrl'})
		.when('/daily', {templateUrl: '/partials/daily/daily', controller:'DailyCtrl'})
		.when('/my-foods', {templateUrl: '/partials/foods/foods', controller:'FoodsCtrl'})
		.when('/my-meals', {templateUrl: '/partials/meals/meals', controller:'MealsCtrl'});
});

foodTracker.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

// angular.module('foodTracker').run(function($rootScope, $location){
// 	$rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
// 		if(rejection === 'not authorized'){
// 			$location.path('/');
// 		}
// 	})
// })

