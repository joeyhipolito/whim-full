'use strict';

angular.module('whimApp')
  .factory('Repo', function ($resource) {    
    return $resource('/repo/:id',{id: '@id'},{
      get: {
        cache: true
      },
      query: {
        cache: true,
        isArray: true
      }

    });
  });