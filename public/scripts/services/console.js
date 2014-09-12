angular.module('whimApp')
  .service('Console', function () {
    var appPort = null;
    var termPort = null;

    var setAppPort = function(port) {
      appPort = port;
    }

    var getAppPort = function(port) {
      return appPort;
    }

    var setTermPort = function(port) {
      termPort = port;
    }

    var getTermPort = function(port) {
      return termPort;
    }

    return {
      getAppPort: getAppPort,
      setAppPort: setAppPort,
      getTermPort: getTermPort,
      setTermPort: setTermPort  
    }

  });