'use strict';
angular.module('whimApp')
  .controller('ContainerCtrl', function ($state, $scope, $ionicNavBarDelegate, $ionicLoading, $ionicActionSheet, containers, container) {
    
    var loadingText = 'Loading...';

    if (container !== null) {
      loadingText = 'Loading container info...';
      container.$promise.then(function (container) {
        $scope.selected = container;
        $ionicLoading.hide();
      });
    } else {
      loadingText = 'Loading your containers...';
      containers.$promise.then(function(containers) {
        $scope.containers = containers;
        $ionicLoading.hide();
      });
    }

    $ionicLoading.show({
      template: loadingText
    });

    $scope.selectContainer = function (idx, cid) {
      $ionicActionSheet.show({
        buttons: [
          { text: 'View Container'},
          { text: 'Run Container' },
          { text: 'Stop Container' }
        ],
        titleText: 'Manage your container',
        cancelText: 'Cancel',
        buttonClicked: function(index) {
          if (index === 0) {
            $state.go('container.container', {id: cid});
          } else if (index === 1) {
            run(idx);
            return true;
          } else if (index === 2) {
            stop(idx);
            return true;
          }
        }
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
