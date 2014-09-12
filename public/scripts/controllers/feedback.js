'use strict';
angular.module('whimApp')
  .controller('FeedbackCtrl', function ($scope, $ionicNavBarDelegate, feedback, Feedback) {


    feedback.$promise.then(function (res) {
      if (res.user) {
        // console.log(res);
        $scope.feedback = res.feedback;
      };
    });

    $scope.feedback = {
      efficiency: [
        { text: 'allow me to finish tasks more quickly', checked: false},
        { text: 'make it easier to do my job', checked: false },
        { text: 'save time when I use it', checked: false }
      ],
      effectiveness : [
        { text: 'enhance my effectiveness in work', checked: false },
        { text: 'do everything I would expect it to do', checked: false },
        { text: 'help me be more productive', checked: false }
      ],
      engaging : [
        { text: "provides familiar dev environment", checked: false },
        { text: "looks pleasing", checked: false },
        { text: "layout is not complicated", checked: false }
      ],
      ease : [
        { text: "provides easy to access documentation", checked: false },
        { text: "flexible to interact with", checked: false },
        { text: "designed for all levels of user", checked: false}
      ],
      tolerant : [
        { text: "diagnoses the source and cause of error", checked: false },
        { text: "provides revision control", checked: false },
        { text: "makes it difficult to commit errors", checked: false }
      ]
    };


    $scope.feed = function () {
      // console.log($scope.feedback);
      Feedback.save({feedback: $scope.feedback}, function (res) {
        console.log(res);
      });
    };

    $scope.back = function() {
      $ionicNavBarDelegate.back();
    };
  });
