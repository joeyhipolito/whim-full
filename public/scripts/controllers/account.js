'use strict';
angular.module('whimApp')
  .controller('AccountCtrl', function ($scope, user, orgs, containers, $ionicPopup, $timeout, Container) {
    
    $scope.user = user;
    $scope.orgs = orgs;

    $scope.container = {};

    $scope.containers = containers;

  });
