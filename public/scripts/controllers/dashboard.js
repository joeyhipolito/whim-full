'use strict';
angular.module('whimApp')
  .controller('DashboardCtrl', function ($scope, user, orgs) {
    
    $scope.user = user;
    $scope.orgs = orgs;

  });
