angular.module('foodTracker').controller('SignupCtrl', function($scope, $http, $location, mvAuth, mvUser) {

  var vm = this;
  vm.showSignup = true;
  vm.onSubmit = addUser;
  vm.newUser = {};
  vm.newUserFields = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        type: 'text',
        label: 'E-Mail Address',
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
    },
    {
      key: 'confirm-password',
      type: 'input',
      templateOptions: {
        type: 'password',
        label: 'Confirm Password',
        placeholder: '',
        required: true
      }
    }
  ];

  function showSignup(){
    vm.showSignup = true;
  }

  function addUser(){
    //persistUser(vm.newUser);
    mvAuth.createUser(vm.newUser).then(function(){
      console.log("USER CREATED");
      $location.path('/daily');
      // HIDE MODAL
    }, function(reason){
      console.log(reason);
    })
  }

  // persistUser = function(user){
  //   $http.post('/api/users', user)
  //     .success(function(data){
  //       console.log(data);
  //     })
  //     .error(function(data){
  //       console.log("Error: " + data);
  //     });
  // }


});


