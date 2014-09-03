'use strict';

angular.module('whimApp')
  .factory('Auth', function ($location, $rootScope, Session, $cookieStore) {
    $rootScope.currentUser = $cookieStore.get('user') || null;
    $cookieStore.remove('user');

    return {
      logout: function (callback) {
        var cb = callback || angular.noop;
        Session.delete(function (res) {
          $rootScope.currentUser = null;
          return cb();
        },
        function (err) {
          return cb(err.data);
        });
      },
      currentUser: function() {
        Session.get(function(user) {
          $rootScope.currentUser = user;
        });
      }
    }

  });
