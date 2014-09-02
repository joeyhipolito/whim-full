'use strict';

angular.module('whimApp')
  .constant('AUTH_EVENTS', {
    loginSuccess    : 'auth-login-success',
    loginFailure    : 'auth-login-failure',
    logoutSuccess   : 'auth-logout-success',
    notAuthenticaed : 'auth-not-authenticated'
  });
