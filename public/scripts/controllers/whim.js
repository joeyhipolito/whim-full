'use strict';
angular.module('whimApp')
  .controller('WhimCtrl', function ($scope, AuthService) {

    $scope.currentUser = null;

    $scope.setCurrentUser = function (user) {
      $scope.currentUser = user;
    }

  });
