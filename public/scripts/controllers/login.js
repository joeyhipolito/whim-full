'use strict';
angular.module('whimApp')
  .controller('LoginCtrl', function ($scope, Auth) {
     
    $scope.logout = function() {
      Auth.logout();
    }

  });
