'use strict';

angular.module('whimApp')
  .factory('AuthService', function ($http, API) {

    var user = {},
        isLoggedIn = false;

    return {
      logout: function() {
        $http.get('logout').success(function(response) {
          isLoggedIn = false;
        });
      },
      isLoggedIn: isLoggedIn
    };


  });
