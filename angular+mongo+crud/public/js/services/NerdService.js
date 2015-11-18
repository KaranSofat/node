angular.module('NerdService', []).factory('Nerd', function($http, $q) {

    return {

        addUser: function(data) {
          console.log(data);
            var Url = '/addData';

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
        showUser: function(data) {
          
            var Url = '/showUser';

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
        deleteUser: function(id) {
          
            var Url = '/deleteUser/'+id;

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
     editUser: function(id) {
          
            var Url = '/editUser/'+id;

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
        
        editUserSave: function(data,id) {
          
            var Url = '/editUserSave/'+id;

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
 }

});       
