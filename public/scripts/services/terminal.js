'use strict';

angular.module('whimApp')
  .factory('Terminal', function ($resource) {
    return $resource(
      '/terminal/:listController:id/:docController',
      {
        id: '@id',
        listController: '@listController',
        docController: '@docController'
      },
      {
        run: {
          method: 'PUT',
          params: {
            docController: 'run'
          }
        }
      }
    );
  });