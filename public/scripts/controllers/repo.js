'use strict';
angular.module('whimApp')
  .controller('RepoCtrl', function ($scope, account, $ionicNavBarDelegate, Org, User, Repo) {
    $scope.account = account;
    
    // TODO : this shouldn't be like this fuck

    if (account === $scope.currentUser.username) {
      User.repos(function(re){
        $scope.repos = re;
      });
    } else {
      Org.repos({id: account}, function(re){
        $scope.repos = re;
      });
    }

    // clone
    $scope.container = {};

    $scope.clone = function(repoUrl) {
      Repo.save({url: repoUrl}, function(re){
        console.log(re);
      });
    };


    $scope.back = function() {
      $ionicNavBarDelegate.back();
    };

  });
