'use strict';
angular.module('whimApp')
  .controller('ContainerCtrl', function ($scope, $ionicNavBarDelegate, $ionicLoading, container, Container, Terminal, Console, $sce, $timeout) {
 
    var loadingText = 'Loading container info...';
    container.$promise.then(function (container) {
      $scope.container = container;
      Console.setAppPort(container.app.port);
      Console.setTermPort(container.term.port);
      $scope.term = $scope.domain + ':' + Console.getTermPort();
      $scope.term = $sce.trustAsResourceUrl($scope.term);
      $ionicLoading.hide();
    });

    $ionicLoading.show({
      template: loadingText
    });

    $scope.stopApplication = function () {
      Container.delete({id: $scope.container.cid}, function (container){
        $scope.container = container;
        Console.setAppPort(container.app.port);
      });
    };

    $scope.runApplication = function() {
      Container.run({id: $scope.container.cid}, function (container) {
        $scope.container = container;
        Console.setAppPort(container.app.port);
      });
      // angular.element(document.getElementById('w-terminal')).src = angular.element(document.getElementById('w-terminal')).src;
    };

    $scope.runTerminal = function () {
      Terminal.run({id: $scope.container.cid}, function (container) {
        $scope.container = container;
        Console.setTermPort(container.term.port);
        $timeout(function() {
          $scope.term = $scope.domain + ':' + Console.getTermPort();
          $scope.term = $sce.trustAsResourceUrl($scope.term);    
        }, 1000);
      });
    };

    $scope.stopTerminal = function () {
      Terminal.delete({id: $scope.container.cid}, function (container){
        $scope.container = container;
        Console.setTermPort(container.worker.term);
        $scope.term = $scope.domain + ':' + Console.getTermPort();
        $scope.term = $sce.trustAsResourceUrl($scope.term);
      });
    };

    $scope.back = function() {
      $ionicNavBarDelegate.back();
    };

  });
