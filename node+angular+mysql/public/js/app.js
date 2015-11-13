'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','myApp.controllers','angularModalService']).

/*$rootScope.$on("$stateChangeSuccess", function (event, toState, toParams
                                                       , fromState, fromParams) {
      lastStateName = fromState.name;
      lastParams = fromParams;
      lastHref = $state.href(lastStateName, lastParams)  
    })
    
    
    
}])
.run(['$rootScope', '$state', '$stateParams', 'PreviousState',
  function ($rootScope, $state, $stateParams, PreviousState) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams; 
    $rootScope.PreviousState = PreviousState;
}])
*/


   run(function($rootScope,$location) {
        var userIds = localStorage.getItem('userId');
     
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      var userId = localStorage.getItem('userId');
    if(userId == null)
    {
      $("#loggedIn").show();
       $("#non").hide();
    
    }
    else
    {
     $("#loggedIn").hide();
      $("#non").show();
    }
          
        });
        var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
            var loggedIn = userIds;
            if (loggedIn!='null') {
                //$location.path('/home');
            }
      
    })

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider,$stateProvider) {
  
    $routeProvider.
      when('/home', {
     
        templateUrl: 'templates/home.ejs',
        controller: IndexCtrl
      }).
      when('/profile/:id', {
        templateUrl: 'templates/profile.ejs',
        controller: ProfileCtrl
      }).
      when('/login', {
        templateUrl: 'templates/login.ejs',
        controller: LoginCtrl
      }).
      when('/dashboard/', {
        templateUrl: 'templates/dashboard.ejs',
        controller: DashboardCtrl
      }).
       when('/showQuestion/:id', {
        templateUrl: 'templates/showQuestion.ejs',
        controller: showQuestionCtrl
      }).

      when('/deletePost/:id', {
        templateUrl: 'partials/deletePost',
        controller: DeletePostCtrl
      }).
      otherwise({
        redirectTo: '/home'
      });
    //$locationProvider.html5Mode(true);
  }]);
