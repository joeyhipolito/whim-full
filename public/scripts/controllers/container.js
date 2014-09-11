'use strict';
angular.module('whimApp')
  .controller('ContainerCtrl', function ($scope, $ionicNavBarDelegate, $ionicLoading, containers) {
    
    $scope.containers = containers;

    $scope.selectContainer = function (id) {
      console.log(id);
    };

    $scope.back = function() {
      $ionicNavBarDelegate.back();
    };

  });
