'use strict';
angular.module('whimApp')
  .controller('ContainerCtrl', function ($scope, $ionicNavBarDelegate, $ionicPopup, $ionicLoading) {
    
    $scope.back = function() {
      $ionicNavBarDelegate.back();
    };

  });
