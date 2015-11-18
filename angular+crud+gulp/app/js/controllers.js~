angular.module('myApp.controllers', [])

/*========start show all users=========*/
.controller('UserCtrl', function($scope, $state, $http, CrudApp) {
    CrudApp.Users().then(function(response) {
        $scope.users = response.users;
    });

    $scope.addUser = function() {
        $state.go('addUser')
    }
    //function for delete user
    $scope.deleteUser = function(id) {
        CrudApp.deleteUser(id).then(function(response) {
            if (response.data == 'delete Succesfully') {
                CrudApp.Users().then(function(response) {
                    $scope.users = response.users;

                });
            }
        })

    }

})
/*========end show all users=========*/

/*========start add  user=========*/
.controller('addUserCtrl', function($scope, $state, $http, CrudApp) {

    $scope.user = {};
    $scope.saveInfo = function() {
        CrudApp.addUser($scope.user).then(function(response) {
            $state.go('users');
        })

    }
    //cancel page
    $scope.cancel = function() {
        $state.go('users');
    }
})
/*========end add  user=========*/

/*========start edit  user=========*/
.controller('editUserCtrl', function($scope, $state, $stateParams, $http, CrudApp) {
    $scope.user = {};
    var id = $stateParams.id;
    
    //show user data in the forms
    CrudApp.editUser(id).then(function(response) {
        $scope.user.name = response.users.first_name;
        $scope.user.lastname = response.users.last_name;
        $scope.user.email = response.users.email;
        $scope.user.company = response.users.company;
        $scope.user.designation = response.users.designation;

    });

    //function for update the userInfo
    $scope.updateInfo = function() {
        $scope.user.id = $stateParams.id;
        CrudApp.updateInfo($scope.user).then(function(response) {
            if (response.data == 'update Succesfully') {
                $state.go('users');

            }

        })
    }
    $scope.cancel = function() {
        $state.go('users');
    }
});
/*========end add  user=========*/
