'use strict';

angular.module('whimApp')
  .factory('Org', function ($resource) {
    return $resource(
      '/org/:listController:id/:docController',
      {
        id: '@id',
        listController: '@listController',
        docController: '@docController'
      },
      {
        repos: {
          method: 'GET',
          cache: true,
          isArray: true,
          params: {
            docController: 'repos'
          }
        }
      }
    );
  });