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
    'ionic'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'LoginCtrl'
      });

  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
  })
  .run(function ($rootScope, AUTH_EVENTS, AuthService) {
    $rootScope.$on('$stateChanStart', function (event, next) {
      var authRequired =  next.authRequired;
      if (!AuthService.isAuthenticated()) {
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      };
    });
  });