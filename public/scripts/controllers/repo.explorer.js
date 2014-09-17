'use strict';
angular.module('whimApp')
  .controller('RepoExplorerCtrl', function ($scope, $ionicNavBarDelegate, repo, path, file, $ionicLoading) {
    
    var loadingText = 'Loading list of files...';

    $ionicLoading.show({
      template: loadingText
    });

    $scope.repo = repo;
    $scope.path = path;
    if (!path || path === '' || path === undefined) {
      $scope.title = repo;
    } else {
      $scope.title = repo + '/' + path;
    }

    file.$promise.then(function (re) {
      $scope.files = re;
      $ionicLoading.hide();
    });

    $scope.back = function() {
      $ionicNavBarDelegate.back();
    };

  });
