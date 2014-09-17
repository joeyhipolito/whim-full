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
      var repo = getProject();
      Repo.get({id: repo, file: file.path}).$promise.then(function( file ){

        file = file;

        for (var i = open.length - 1; i >= 0; i--) {
          open[i].active = false
        };

        open.push({
          name: file.name,
          path: file.path,
          active: true,
          content: file.content
        });

        active = open[open.length - 1];
      });

      
    };

    var getActive = function() {
      return active;
    };

    var getOpenFiles = function () {
      return open;
    }

    return {
      setProject: setProject,
      getProject: getProject,
      openFile: openFile,
      getActive: getActive,
      getOpenFiles: getOpenFiles
    }

  });