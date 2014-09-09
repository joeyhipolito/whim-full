'use strict';
angular.module('whimApp')
  .controller('ContainerCtrl', function ($scope, $ionicNavBarDelegate, $ionicLoading, containers) {
    
    $scope.containers = containers;

    $scope.back = function() {
      $ionicNavBarDelegate.back();
    };

  });
