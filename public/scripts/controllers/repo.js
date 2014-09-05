'use strict';
angular.module('whimApp')
  .controller('RepoCtrl', function ($scope, account, $ionicNavBarDelegate, Org, User) {
    $scope.account = account;
    if (account === $scope.currentUser.username) {
      User.repos(function(re){
        $scope.repos = re;
      });
    } else {
      Org.repos({id: account}, function(re){
        $scope.repos = re;
      });
    }

    $scope.back = function() {
      $ionicNavBarDelegate.back();
    }

  });
