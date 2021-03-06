angular.module('myApp', ['myApp.controllers', 'myApp.services','ui.router'])

.run(function($rootScope,$http,$window, $stateParams, $location,$state) {
 
})
  .constant('ApiEndpoint', {
  url: 'http://localhost/AngularApp/WebServices/web/app_dev.php/'
}) 

  .config(function($stateProvider, $urlRouterProvider,$locationProvider,$httpProvider) {
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  $stateProvider
  
  .state('users', {
    url: "/users",
    templateUrl: "templates/users.html",
    controller: 'UserCtrl'
  })
   .state('addUser', {
    url: "/addUser",
    templateUrl: "templates/addUser.html",
    controller: 'addUserCtrl'
  })
 
   .state('editUser', {
    url: "/editUser/:id",
    templateUrl: "templates/editUser.html",
    controller: 'editUserCtrl'
  })

  $urlRouterProvider.otherwise('/users');
  $locationProvider.html5Mode(true);

});
