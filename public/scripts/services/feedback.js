'use strict';

angular.module('whimApp')
  .factory('Feedback', function ($resource) {    
    return $resource('/feedback/:id',{id: '@id'},{});
  });