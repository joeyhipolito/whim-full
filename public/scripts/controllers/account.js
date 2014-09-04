'use strict';
angular.module('whimApp')
  .controller('AccountCtrl', function ($scope, user, orgs) {
    
    user.$promise.then(function(re){
      $scope.user = re;
    });

    orgs.$promise.then(function(re){
      $scope.orgs = re;
    });


  });
