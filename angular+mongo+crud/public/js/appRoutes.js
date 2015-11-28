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

		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'loginController'	
		})
    	.when('/addUser', {
			templateUrl: 'views/addUser.html',
			controller: 'addUserController'	
		})
     	.when('/editUser/:id', {
			templateUrl: 'views/edit.html',
			controller: 'editUserController'	
		})
    .when('/view/:id', {
			templateUrl: 'views/view.html',
			controller: 'viewController'	
		})
		 .when('/comment_edit/:id/:mainId', {
			templateUrl: 'views/commentEdit.html',
			controller: 'commentEditController'	
		});

	//$locationProvider.html5Mode(true);

}]);
