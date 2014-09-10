'use strict';
angular.module('whimApp')
  .controller('RepoCtrl', function ($scope, $stateParams, $ionicNavBarDelegate, $ionicPopup, $ionicLoading, repos, user, Org) {
    
    $scope.container = {};
    $ionicLoading.show({
      template: 'Loading repositories'        
    });

    if ($stateParams.org) {
      $scope.account = $stateParams.org;
      Org.repos({id: $stateParams.org}, function (repos) {
        $scope.repos = repos;
        $ionicLoading.hide();
      })
    } else {
      $scope.account = $stateParams.user;

      repos.$promise.then(function (re) {
        $scope.repos = re;
        $ionicLoading.hide();
      });
    }

    // clone
    $scope.clone = function(repoUrl) {
      $ionicPopup.show({
        template: '<input type="text" ng-model="container.name">',
        title: 'Enter desired container name',
        subTitle: '(/^[a-z][-._a-z0-9]*$/)',
        scope: $scope,
        buttons: [
          {text: 'Cancel'},
          {
            text: '<b>Clone</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.container.name) {
                e.preventDefault();
              } else {
                Repo.save({'name': $scope.container.name, 'url': repoUrl}, function(container) {
                  if (container.error) {
                    $ionicPopup.alert({
                      title: 'Ooooops!!!',
                      template: container.error
                    });
                  } else {
                    $ionicPopup.alert({
                      title: 'Success!',
                      subTitle: 'Cloned to ' + container.name
                    });
                    $scope.container = {};
                  }
                  
                });
              }
            }
          }
        ]
      });
    };


    $scope.back = function() {
      $ionicNavBarDelegate.back();
    };

  });
