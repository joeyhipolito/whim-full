'use strict';
angular.module('whimApp')
  .controller('EditorCtrl', function ($scope, $ionicNavBarDelegate, Editor) {

    $scope.active = Editor.getActive();

    $scope.editorOptions = {
      lineWrapping : true,
      lineNumbers: true,
      mode: 'javascript',
      theme:'monokai'
    };

    $scope.back = function() {
      $ionicNavBarDelegate.back();
    };
    
  });
