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
      })
      .state('account.settings', {
        url: '/settings',
        templateUrl: 'views/settings.html',
        controller: 'AccountCtrl',
        resolve: {
          user: function(User) {
            return User.get();
          }
        }
      });

    // container
    $stateProvider
      .state('container',{
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html',
        resolve: {
          containers: function(Container) {
            return Container.query();
          }
        }
      })
      .state('container.containers',{
        url: '/container',
        templateUrl: 'views/container.html',
        controller: 'ContainerCtrl'
      });

    // repository
    $stateProvider
      .state('repository', {
        abstract: true,
        templateUrl: 'views/templates/left-sidebar.html'
      })
      .state('repository.repos', {
        url: '/:account/repos',
        templateUrl: 'views/repo.html',
        resolve: {
          account: function($stateParams) {
            return $stateParams.account;
          }
        },
        controller: 'RepoCtrl'
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
