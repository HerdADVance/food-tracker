angular.module('foodTracker').controller('SignupCtrl', function($scope, $http, $location, mvAuth, mvUser, mvNotifier, mvModals) {

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

  vm.showModal = mvModals.signupModal;
  console.log(vm.showModal);

  function showSignup(){
    vm.showSignup = true;
  }

  function addUser(){
    //persistUser(vm.newUser);
    mvAuth.createUser(vm.newUser).then(function(){
      $location.path('/my-foods');
      // HIDE MODAL
    }, function(reason){
      mvNotifier.error(reason);
    })
  }


});


