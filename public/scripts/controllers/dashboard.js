'use strict';
angular.module('whimApp')
  .controller('DashboardCtrl', function ($scope, $ionicLoading, user, orgs) {
    
    $scope.user = user;
    $scope.orgs = orgs;

    $ionicLoading.show({
      template: 'Loading account data...'
    });

    user.$promise.then(function(user){
      $scope.user = user;
      $ionicLoading.hide();
    });

  });
