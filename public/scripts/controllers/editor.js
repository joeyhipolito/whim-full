'use strict';
angular.module('whimApp')
  .controller('EditorCtrl', function ($scope, $ionicNavBarDelegate, Editor, File, $ionicPopup, $timeout) {

    $scope.active = Editor.getActive();
    $scope.openFiles = Editor.getOpenFiles();

    $scope.commit = {};

    
      $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        matchBrackets: true,
        dragDrop: false,
        autofocus: true,
        mode: 'javascript',
        theme:'monokai'
      };

    $scope.editor = null;
    
    $scope.codemirrorLoaded = function(_editor){
    // Editor part
      var _doc = _editor.getDoc();
      console.log(_doc);
      _editor.focus();
      $scope.editor = _editor;
    };

    $scope.focus = function () {
      console.log($scope.editor);
      $scope.editor.focus();
    }

    $scope.save = function () {
      $ionicPopup.show({
        template: '<input type="text" ng-model="commit.message">',
        title: 'Add a brief change description.',
        scope: $scope,
        buttons: [
          {text: 'Cancel'},
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.commit.message) {
                console.log('no commit');
                e.preventDefault();
              } else {
                var file = $scope.active;

                File.update({id: Editor.getProject(), file: file.path , content: file.content, commit: $scope.commit.message})
                    .$promise.then(function(re) {
                      $ionicPopup.alert({
                        title: 'Success!',
                        subTitle: 'Updated ' + $scope.active.name
                      });
                      $scope.commit = '';
                      console.log(re);
                      $scope.active = re.content;
                    });
              }
            }
          }
        ]
      });

      
    }

    $scope.back = function() {
      $ionicNavBarDelegate.back();
    };
    
  });
