'use strict';
angular.module('whimApp')
  .controller('ContainerCtrl', function ($scope, $ionicNavBarDelegate, $ionicLoading, $ionicActionSheet, container) {
    
    var loadingText = 'Loading container info...';
    container.$promise.then(function (container) {
      $scope.container = container;
      console.log(container);
      $ionicLoading.hide();
    });

    $ionicLoading.show({
      template: loadingText
    });

    var select = function () {
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
