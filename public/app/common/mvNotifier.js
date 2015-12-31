angular.module('foodTracker').value('mvToastr', toastr);

angular.module('foodTracker').factory('mvNotifier', function(mvToastr){
	return{
		notify: function(msg){
			mvToastr.success(msg);
		},
		error: function(msg){
			mvToastr.error(msg);
		}
	}
})