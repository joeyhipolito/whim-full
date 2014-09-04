'use strict';
angular.module('whimApp')
  .controller('RepoCtrl', function ($scope, account, repos, $ionicNavBarDelegate) {
    $scope.account = account;
    $scope.repos = repos;
  });
