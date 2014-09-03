'use strict';

angular.module('whimApp')
  .factory('test', function ($resource) {
    return $resource('/secured');
  });
