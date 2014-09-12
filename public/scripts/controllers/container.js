'use strict';
angular.module('whimApp')
  .controller('ContainerCtrl', function ($scope, $ionicNavBarDelegate, $ionicLoading, container, Container, Console) {
 
    var loadingText = 'Loading container info...';
    container.$promise.then(function (container) {
      $scope.container = container;
      Console.setAppPort(container.worker.app);
      Console.setTermPort(container.worker.term);
      $ionicLoading.hide();
    });

    $ionicLoading.show({
      template: loadingText
    });

    $scope.stopContainer = function () {
      Container.delete({id: $scope.container.cid}, function (container){
        $scope.container = container;
        Console.setAppPort(container.worker.app);
        Console.setTermPort(container.worker.term);
      });
    };

    $scope.runContainer = function() {
      Container.run({id: $scope.container.cid}, function (container) {
        $scope.container = container;
        Console.setAppPort(container.worker.app);
        Console.setTermPort(container.worker.term);
      });
    };

    $scope.back = function() {
      $ionicNavBarDelegate.back();
    };

  });
