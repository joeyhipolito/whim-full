'use strict';
angular.module('whimApp')
  .controller('LoginCtrl', function ($scope, AuthService) {

    $scope.logout = function() {
      console.log(AuthService.logout());
    };

  });
