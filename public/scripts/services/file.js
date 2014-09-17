'use strict';

angular.module('whimApp')
  .factory('File', function ($resource) {


    return $resource('/file/:id',{id: '@id'},{
      update: {
        method: 'PUT'
      }
    });
  });