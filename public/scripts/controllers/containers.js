'use strict';
angular.module('whimApp')
  .controller('ContainersCtrl', function ($scope, $ionicNavBarDelegate, $ionicLoading, containers) {

    var loadingText = 'Loading your containers...';

    containers.$promise.then(function(containers) {
      $scope.containers = containers;
      $ionicLoading.hide();
    });

    $ionicLoading.show({
      template: loadingText
    });

  });
