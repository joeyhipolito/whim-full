'use strict';
angular.module('whimApp')
  .controller('AccountCtrl', function ($scope, user, orgs, containers, $ionicPopup, $timeout, Container) {
    
    $scope.user = user;
    $scope.orgs = orgs;

    $scope.container = {};

    $scope.containers = containers;

    $scope.showPopup = function() {
      $scope.data = {}

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="container.name">',
        title: 'Enter desired container name',
        subTitle: '(/^[a-z][-._a-z0-9]*$/)',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.container.name) {
                e.preventDefault();
              } else {
                Container.save({'name': $scope.container.name}, function(container){
                  console.log(container);
                  // if (re.error) {
                  //   $ionicPopup.alert({
                  //     title: 'Ooooops!!!',
                  //     template: re.error
                  //   });
                  // };
                  // $scope.containers.push(re);
                  // $scope.container = {};
                });
              }
            }
          },
        ]
      });
      // myPopup.then(function(res) {
      //   console.log('Saved!', res);
      // });
      // $timeout(function() {
      //    myPopup.close(); //close the popup after 3 seconds for some reason
      // }, 3000);
    };


  });
