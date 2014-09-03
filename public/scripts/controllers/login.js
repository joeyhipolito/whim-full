'use strict';
angular.module('whimApp')
  .controller('LoginCtrl', function ($scope, test) {

    $scope.test = function() {
      console.log('clicked!');
      test.get(function (re) {
        console.log(re);
      });
    };

  });
