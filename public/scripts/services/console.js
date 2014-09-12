angular.module('whimApp')
  .factory('Console', function () {
    var appPort = 49000;
    var termPort = 49000;

    return {
      app: appPort,
      term: termPort,
      setAppPort: function (port) {
        appPort = port; 
      },
      setTermPort: function (port) {
        termPort = port;
      }
    }
  });