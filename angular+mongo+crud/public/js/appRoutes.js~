angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/nerds', {
			templateUrl: 'views/nerd.html',
			controller: 'NerdController'
		})

		.when('/geeks', {
			templateUrl: 'views/geek.html',
			controller: 'GeekController'	
		})
    	.when('/addUser', {
			templateUrl: 'views/addUser.html',
			controller: 'addUserController'	
		})
     	.when('/editUser/:id', {
			templateUrl: 'views/edit.html',
			controller: 'editUserController'	
		});

	//$locationProvider.html5Mode(true);

}]);
