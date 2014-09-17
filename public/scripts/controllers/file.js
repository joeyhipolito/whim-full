'use strict';
angular.module('whimApp')
  .controller('FileCtrl', function ($scope, $ionicNavBarDelegate, $ionicLoading, $stateParams, Repo, Editor) {
    
    var repo = $stateParams.repo;
    var path = $stateParams.path;

    // ready for editor
    Editor.setProject(repo);

    var loadingText = 'Loading file info...';

    $ionicLoading.show({
      template: loadingText
    });

    Repo.get({id: repo, file: path}).$promise.then(function(file){
      $ionicLoading.hide();
      $scope.file = file;
    });

    $scope.openFile = function() {
      Editor.openFile($scope.file);
    };

    $scope.back = function() {
      $ionicNavBarDelegate.back();
    };


  });
