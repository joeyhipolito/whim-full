angular.module('whimApp')
  .service('Editor', function (Repo) {

    var project = null;
    var open = [];
    var active = null;

    var setProject = function (repo) {
      project = repo;
    };

    var getProject = function () {
      return project;
    };

    var openFile = function(file) {
      for (var i = open.length - 1; i >= 0; i--) {
        open[i].active = false
      };

      open.push({
        name: file.name,
        path: file.path,
        active: true
      });

      active = file.name;
    };

    var getActive = function() {
      return active;
    };

    return {
      setProject: setProject,
      getProject: getProject,
      openFile: openFile,
      getActive: getActive
    }

  });