angular.module('foodTracker').controller('SignupCtrl', function($scope, $http) {
 
  var vm = this;
  vm.onSubmit = addUser;
  vm.newUser = {};
  vm.newUserFields = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Email',
        placeholder: '',
        required: true
      }
    },
     {
      key: 'username',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'Username',
        placeholder: '',
        required: true
      }
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Password',
        placeholder: '',
        required: true
      }
    }
  ];

  function addUser(){
    persistUser(vm.newUser);
  }

  persistUser = function(user){
    $http.post('/api/users', user)
      .success(function(data){
        console.log(data);
      })
      .error(function(data){
        console.log("Error: " + data);
      });
  }

});


