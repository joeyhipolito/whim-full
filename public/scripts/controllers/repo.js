'use strict';
angular.module('whimApp')
  .controller('RepoCtrl', function ($scope, account, $ionicNavBarDelegate, Org, User) {
    $scope.account = account;
    if (account === $scope.currentUser.username) {
      User.repos(function(re){
        $scope.repos = re;
        console.log($scope.repos);
      });
    } else {
      Org.repos(function(re){
        console.log(re);
      });
    }
  });
