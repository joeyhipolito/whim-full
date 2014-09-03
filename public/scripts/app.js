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
        templateUrl: 'views/home.html',
        controller: 'LoginCtrl'
      });


    $stateProvider
      .state('account', {
        url: '/account',
        template: '<p style="color: #fff">{{currentUser.name}}</p>'
      });
  })
  .run(function ($rootScope, $location, Auth) {
    $rootScope.$watch('currentUser', function(currentUser){
      if (!currentUser) {
        Auth.currentUser();
      }
    });

    $rootScope.$on('event:auth-loginRequired', function () {
      $location.path('/');
      return false;
    })
  })