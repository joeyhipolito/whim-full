'use strict';

angular.module('whimApp')
  .factory('Session', function ($resource) {
    return $resource('/auth/session/');
  });
