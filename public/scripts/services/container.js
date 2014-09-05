'use strict';

angular.module('whimApp')
  .factory('Container', function ($resource) {
    return $resource(
      '/container/:listController:id/:docController',
      {
        id: '@id',
        listController: '@listController',
        docController: '@docController'
      },
      {
        get: {
          cache: true
        },
        run: {
          method: 'PUT',
          params: {
            docController: 'run'
          }
        }
      }
    );
  });