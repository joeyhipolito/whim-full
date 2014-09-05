'use strict';

angular.module('whimApp')
  .factory('User', function ($resource) {
    return $resource(
      '/user/:listController:id/:docController',
      {
        id: '@id',
        listController: '@listController',
        docController: '@docController'
      },
      {
        get: {
          cache: true
        },
        repos: {
          method: 'GET',
          cache: true,
          isArray: true,
          params: {
            docController: 'repos'
          }
        },
        orgs: {
          method: 'GET',
          cache: true,
          isArray: true,
          params: {
            docController: 'orgs'
          }
        }
      }
    );
  });