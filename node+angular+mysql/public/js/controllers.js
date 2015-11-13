'use strict';
angular.module('myApp.controllers', ['angularModalService'])

/* Controllers */

function IndexCtrl($scope, $http,HomeOwners,$location) {
 HomeOwners.home().then(function(response) {
 $scope.data = response.data;
 $scope.data2 = response.data2; 
 
  });
   
}

function ProfileCtrl($scope, $http, $location,$routeParams,HomeOwners) {
var id = $routeParams.id;
 HomeOwners.profile(id).then(function(response) {

  $scope.data = response.data[0];
 
  $scope.data2 = response.data2;
  
 
  });
}



function LoginCtrl($scope, $http, $routeParams,HomeOwners,$location) {
$scope.user = {};
$scope.login = function () {
HomeOwners.login($scope.user).then(function(response) {
if(response.data == "login Detail Failed")
{
  alert('please check your credentials');
  $location.url('/login');
 
}
else
{
  var id = response.data[0].id;
  var email = response.data[0].email;
  localStorage.setItem('userId', id);
  localStorage.setItem('email', email);
   
   $location.url('/dashboard');
}
 
  });


}

}

function DashboardCtrl($scope, $http, $location, $routeParams,HomeOwners,ModalService) {


  HomeOwners.dashboard().then(function(response) {
  $scope.questions = response.data;
  $scope.userInfo = response.data3[0];
  })
  $scope.Questions ={};
   $scope.addQuestion = function () {
    HomeOwners.addQuestion($scope.Questions).then(function(response) { 
     //$location.url('/');
    })  
      HomeOwners.dashboard().then(function(response) {
      $scope.questions = response.data;
      $scope.userInfo = response.data3[0];
     })
    }
 
    $scope.deleteQ = function (id) {

   HomeOwners.deleteQ(id).then(function(response) { 
   console.log(response);
   
   })
        HomeOwners.dashboard().then(function(response) {
     $scope.questions = response.data;
     $scope.userInfo = response.data3[0];
     })
    }
     /*$scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };*/
     $scope.changeImage = function (id) {
      ModalService.showModal({
  template: "<div>Fry lives in {{futurama.city}}</div>",
  controller: function() {
    this.city = "New New York";
  },
  controllerAs : "futurama"
})    

 }
}
function headCtrl($scope, $http, $location, $routeParams,HomeOwners) {
$scope.userId= localStorage.getItem('userId');
$scope.email = localStorage.getItem('email');
//alert($scope.email);
$scope.logout = function () {
localStorage.removeItem('userId');
 $location.url('/');

}

}

function showQuestionCtrl($scope, $http, $location,$routeParams,HomeOwners) {

  var id = $routeParams.id;
 
  $scope.userId= localStorage.getItem('userId');
 
   HomeOwners.showAnswer(id).then(function(response) {
   console.log(response)
  $scope.answers = response.data2;

  })
  var userId = [];
  HomeOwners.showQuestion(id).then(function(response) {
    $scope.detail = response.data[0];
    console.log(response.data2[0]);
    $scope.likes = response.data2[0].Likes;
    console.log($scope.likes);
    userId.push($scope.detail.user_id);
  });
   

  $scope.answer={};
  $scope.addAnswer = function (qId) {

  if(userId[0] ==  $scope.userId)
  {
  alert('You cannot give answer your own question');
  return false;
  
  }
  if($scope.userId == null)
  {
      alert('Please Login for answer this question');
  return false;
    
  }
  
  var data = {answer:$scope.answer.description,question_id:qId,user_id:$scope.userId};
  HomeOwners.Answer(data).then(function(response) {


  })

}
 $scope.like = function () {

   if(userId[0] ==  $scope.userId)
   {
    alert("you cannot give vote your own question");
    return false;
    
   }
    if($scope.userId == null)
  {
      alert('Please Login for vote this question');
  return false;
    
  }
  HomeOwners.like(id,$scope.userId).then(function(response) {
    $scope.likes = response.data2[0].Likes; 
 
 })

 }
 
 
 
 
 
}


function DeletePostCtrl($scope, $http, $location, $routeParams) {
  
}
