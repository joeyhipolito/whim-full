'use strict'

angular
  .module('whimApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.codemirror',
    'ionic',
    'http-auth-interceptor'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html'
      });

    $stateProvider
      .state('explorer', {
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html'
      })
      .state('explorer.account', {
        url: '/account',
        templateUrl: 'views/account.html',
        controller: 'AccountCtrl',
        resolve: {
          user: function(User){ 
            return User.get();
          },
          orgs: function(User){
            return User.orgs();
          },
          containers: function(Container) {
            return Container.query();
          }
        }
      })
      .state('explorer.repo', {
        url: '/:account/repo',
        templateUrl: 'views/repo.html',
        resolve: {
          account: function($stateParams) {
            return $stateParams.account;
          }
        },
        controller: 'RepoCtrl'
      });


    $stateProvider
      .state('account', {
        url: '/account',
        template: '<p style="color: #fff">{{currentUser.name}}</p><a ng-href="/">home</a><h1 style="color: #fff" ng-click="test()">test</h1>',
        controller: function($scope, test) {
          $scope.test = function() {
            console.log('clicked!');
            test.get(function (re) {
              console.log(re);
            });
          };
        }
      });
  })
  .run(function ($rootScope, $location, Auth) {
    $rootScope.$watch('currentUser', function(currentUser){
      if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) === -1)) {
        Auth.currentUser();
      }
    });

    $rootScope.$on('event:auth-loginRequired', function () {
      console.log('auth-loginRequired');
      $location.path('/');
      return false;
    })
  })
