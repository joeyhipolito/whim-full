'use strict'

angular
  .module('whimApp', [
    'ionic',
    'ngCookies',
    'ngResource',
    'ui.codemirror',
    'http-auth-interceptor'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html'
      });

    // account

    $stateProvider
      .state('account',{
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html',
        resolve: {
          user: function(User) {
            return User.get();
          },
          orgs: function(User) {
            return User.orgs();
          }
        }
      })
      .state('account.dashboard',{
        url: '/account',
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      });

    // container
    $stateProvider
      .state('container',{
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html'
      })
      .state('container.containers',{
        url: '/container',
        templateUrl: 'views/container.html',
        resolve: {
          containers: function(Container) { // note plural
            return Container.query();
          }
        },
        controller: 'ContainersCtrl' // note plural
      })
      .state('container.container', {
        url: '/container/:id',
        templateUrl: 'views/container-single.html',
        resolve: {
          container: function($stateParams, Container) { // note singular
            return Container.get({id: $stateParams.id});
          }
        },
        controller: 'ContainerCtrl' // note singular
      });

    $stateProvider
      .state('console', {
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html'
      })
      .state('console.terminal', {
        url: '/console',
        templateUrl: 'views/console.html',
        controller: function($scope, $sce, Console, $ionicNavBarDelegate) {
          $scope.term = $scope.domain + ':' + Console.getTermPort();
          $scope.term = $sce.trustAsResourceUrl($scope.term);

          $scope.back = function() {
            $ionicNavBarDelegate.back();
          };
        }
      });

    $stateProvider
      .state('terminal', {
        url:'/terminal',
        templateUrl: 'views/terminal.html'
      });

    // repository
    $stateProvider
      .state('repository', {
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html'
      })
      .state('repository.repos', {
        url: '/repo?user&org',
        templateUrl: 'views/repo.html',
        resolve: {
          user: function (User) {
            return User.get();
          },
          repos: function(User) {
            return User.repos();
          }
        },
        controller: 'RepoCtrl'
      });

    $stateProvider
      .state('feedback', {
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html'
      })
      .state('feedback.send', {
        url: '/feedback',
        templateUrl: 'views/feedback.html',
        resolve: {
          feedback: function(Feedback) {
            return Feedback.get();
          }
        },
        controller: 'FeedbackCtrl'
      });

  })
  .run(function ($rootScope, $location, Auth, $ionicLoading, whim) {

    $rootScope.domain = whim;

    $rootScope.$watch('currentUser', function(currentUser){
      if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) === -1)) {
        Auth.currentUser();
      }
    });

    $rootScope.$on('event:auth-loginRequired', function () {
      $ionicLoading.hide();
      $location.path('/');
      return false;
    })
  })
