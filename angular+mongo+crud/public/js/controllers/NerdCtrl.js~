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


.controller('loginController', function($scope,Nerd,$routeParams,$location) {

$scope.user={};

 $scope.search = function (id) {
 console.log($scope.user);
 Nerd.search($scope.user).then(function(response) { 
 
  $scope.data = response.data;

 })
 
 
 }



})

.controller('viewController', function($scope,Nerd,$routeParams,$location) {
var uid = $routeParams.id;

 Nerd.view(uid).then(function(response) { 
 $scope.x = response.data;
 $scope.userComments = response.data.comments;
  console.log($scope.userComments);
  
 })
$scope.user={};
$scope.comment = function (id) {
Nerd.comments($scope.user,id).then(function(response) { 
//$scope.userComments = response.data.comments;


})


}
 $scope.delete = function (id) {
 var data = {uid:uid};
Nerd.deleteComments(id,data).then(function(response) { 
console.log(response);


})
 
 }

})

.controller('commentEditController', function($scope,Nerd,$routeParams,$location) {

$scope.user = {};
var id = $routeParams.id;
var mainId = $routeParams.mainId;
Nerd.commentsEdit(id,mainId).then(function(response) { 
$scope.commentData = response.data[0].comments;
console.log($scope.commentData);

$scope.user.name = $scope.commentData[0].uname;
$scope.user.email = $scope.commentData[0].uemail;
$scope.user.comment = $scope.commentData[0].comment;
$scope.user.id= id;
 $scope.save = function () {

  
  Nerd.commentsSave(mainId,$scope.user).then(function(response) { 
  
   if(response.data == 'success')
  $location.url('/view/'+mainId)
  })
 
 }

})




})















