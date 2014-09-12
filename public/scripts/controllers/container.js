'use strict';
angular.module('whimApp')
  .controller('ContainerCtrl', function ($scope, $ionicNavBarDelegate, $ionicLoading, container, Container, Console) {
    
    var loadingText = 'Loading container info...';
    container.$promise.then(function (container) {
      $scope.container = container;
      $ionicLoading.hide();
    });

    $ionicLoading.show({
      template: loadingText
    });

    $scope.stopContainer = function () {
      console.log($scope.container);
      Container.delete({id: $scope.container.cid}, function (container){
        $scope.container = container;
      });
    };

    $scope.runContainer = function() {
      Container.run({id: $scope.container.cid}, function (container) {
        $scope.container = container;
        Console.setAppPort(container.worker.app);
        Console.setTermPort(container.worker.term);
      });
    };

    var stop = function (idx) {
      $scope.containers[idx].worker.status = 'stopped';
    };

    var run = function (idx) {
      $scope.containers[idx].worker.status = 'running';
    }

    $scope.back = function() {
      $ionicNavBarDelegate.back();
    };

  });
