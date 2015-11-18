angular.module('NerdCtrl', []).controller('NerdController', function($scope) {

	$scope.tagline = 'Nothing beats a pocket protector!';

})
.controller('addUserController', function($scope,Nerd) {

   Nerd.showUser().then(function(response) { 
   
   $scope.userList = response.data;
   
   });

  $scope.user = {};
	$scope.addUser = function () {
	console.log($scope.user);
	    Nerd.addUser($scope.user).then(function(response) { 
      if(response.data == 'saveData')
      {
          
          alert('dataSaved----Please Refresh');  
      }
      
  })
	
	}

  $scope.delete = function (id) {
    Nerd.deleteUser(id).then(function(response) { 
   if(response.data == 'delete')
      {
          
          alert('delete----Please Refresh');  
      }
    })
 
  }

})



.controller('editUserController', function($scope,Nerd,$routeParams,$location) {
$scope.user ={};
var id = $routeParams.id;
  Nerd.editUser(id).then(function(response) { 
 // console.log(response.data.name);
  $scope.user.name = response.data.name;
  $scope.user.email = response.data.email;
  $scope.user.address = response.data.address;
  });
   $scope.updateUser = function () {
   Nerd.editUserSave($scope.user,id).then(function(response) { 
   
   if(response.data == 'update')
   {
      alert('update----Please Refresh')
     // $location.go('addUser');
   }
   })
   
   }

})

