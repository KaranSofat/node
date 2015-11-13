'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','myApp.controllers']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  
    $routeProvider.
      when('/', {
     
        templateUrl: 'views/layout.ejs',
        controller: LoginCtrl
      }).
      when('/user/login/', {
        templateUrl: 'views/login.ejs',
        controller: AddPostCtrl
      }).
      when('/readPost/:id', {
        templateUrl: 'partials/readPost',
        controller: ReadPostCtrl
      }).
      when('/editPost/:id', {
        templateUrl: 'partials/editPost',
        controller: EditPostCtrl
      }).
      when('/deletePost/:id', {
        templateUrl: 'partials/deletePost',
        controller: DeletePostCtrl
      }).
      otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }]);
