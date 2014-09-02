'use strict';

angular.module('whimApp')
  .factory('AuthService', function ($http, API) {

    var user = {};
    var authenticated = false;

    return {
      logout: function() {
        $http.get('logout').success(function(response) {
          isAuthenticated = false;
        });
      },
      isAuthenticated: function() {
        return authenticated;
      }
    };

  });
