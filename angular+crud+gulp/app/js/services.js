'use strict';

angular.module('myApp.services', [])
  
  
  
  .factory('CrudApp', function($http, $q,ApiEndpoint) {
   var baseurl = ApiEndpoint.url 
  

    return {

        Users: function() {
           
            var Url = baseurl + 'users';

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

         addUser: function(data) {
      
            var Url = baseurl + 'addUser';

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
  
         editUser: function(id) {
      
            var Url = baseurl + 'editUser?id='+id;

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

        updateInfo: function(data) {
     
            var Url = baseurl + 'updateInfo';

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
           deleteUser: function(id) {
      
            var Url = baseurl + 'deleteUser?id='+id;

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

});
