var foodTracker = angular.module('foodTracker', ['formly', 'formlyBootstrap', 'ngResource', 'ngRoute']);

angular.module('foodTracker').config(function($routeProvider, $locationProvider){
	// var routeRoleChecks = {
	// 	admin: {auth: function(mvAuth){
	// 		return mvAuth.authorizeCurrentUserForRoute('admin')
	// 	}},
	// 	admin: {auth: function(mvAuth){
	// 		return mvAuth.authorizeAuthenticatedUserForRoute()
	// 	}}
	// }

	//$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {templateUrl: '/partials/welcome/welcome', controller:'SignupCtrl'})
		.when('/daily', {templateUrl: '/partials/items/daily', controller:'ItemCtrl'})
		.when('/my-foods', {templateUrl: '/partials/foods/foods', controller:'FoodsCtrl'});
});

// angular.module('foodTracker').run(function($rootScope, $location){
// 	$rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
// 		if(rejection === 'not authorized'){
// 			$location.path('/');
// 		}
// 	})
// })

