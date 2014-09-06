'use strict';
angular.module('whimApp')
  .controller('RepoCtrl', function ($scope, account, $ionicNavBarDelegate, Org, User, Repo, $ionicPopup, $ionicLoading) {
    $scope.account = account;
    
    // TODO : this shouldn't be like this fuck
    $ionicLoading.show({
      template: 'Loading repositories'
    });
    if (account === $scope.currentUser.username) {
      User.repos(function(re){
        $ionicLoading.hide();
        $scope.repos = re;
      });
    } else {
      Org.repos({id: account}, function(re){
        $ionicLoading.hide();
        $scope.repos = re;
      });
    }

    // clone
    $scope.container = {};

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
                    $scope.containers.push(container);
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
