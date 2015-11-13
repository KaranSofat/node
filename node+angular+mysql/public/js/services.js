'use strict';
angular.module('myApp.services', []) 
.factory('HomeOwners', function($http, $q) {

    return {

        home: function(item) {
           
            var Url = '/user/home';

            var defer = $q.defer();

            $http.get(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;

        },
         profile: function(id) {
            var Url = '/user/profile/'+id;

            var defer = $q.defer();

            $http.get(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;

        },
        
        login: function(data) {

            var Url = '/user/login/';

            var defer = $q.defer();

            $http.post(Url,data).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;

        },

        dashboard: function(data) {

            var Url = '/user/dashboard/';

            var defer = $q.defer();

            $http.get(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;

        },

        addQuestion: function(data) {

            var Url = '/user/addQuestion/';

            var defer = $q.defer();

            $http.post(Url,data).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;

        },

        deleteQ: function(data) {

            var Url = '/user/deleteQ/'+data;

            var defer = $q.defer();

            $http.get(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;

        },
        
        showQuestion: function(data) {

            var Url = '/user/showQuestion/'+data;

            var defer = $q.defer();

            $http.get(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;

        },
         Answer: function(data) {

            var Url = '/user/answer/';

            var defer = $q.defer();

            $http.post(Url,data).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;

        },
        
        showAnswer: function(data) {

            var Url = '/user/showAnswer/'+data;

            var defer = $q.defer();

            $http.get(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;

        },
        like: function(data,userId) {

            var Url = '/like/'+data+'/'+userId;

            var defer = $q.defer();

            $http.get(Url).
            success(function(data, status, headers, config) {
                defer.resolve(data);
            }).
            error(function(data, status, headers, config) {
                defer.reject();
            });

            return defer.promise;

        },
        
  }
/*....................  End Logout service.................................... */ 
});
/*.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });*/
