var Container = require('../models/container');
var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

exports.run = function (req, res) {
  console.log('enter run');
  var dataContainerID = req.param('id');

  Container.findOne({'cid': dataContainerID}, function (err, dataContainer) {
    if (err) { res.json({ error: err })};
    if (dataContainer) {
      if (dataContainer.term.status === 'running') {
        res.json({error: 'The terminal is already running'});
      } else {
        console.log('not created yet');
        docker.createContainer({Image: 'whim/term'}, function (err, container) {
          dataContainer.term.id = container.id.substr(0,12);
          dataContainer.term.status = 'running';
          dataContainer.save();

          container.attach({stream: true, stdout: true, stderr: true, tty: true}, function (err, stream) {
            stream.pipe(process.stdout);
            container.start({'VolumesFrom': dataContainerID, 'PublishAllPorts': true}, function (err, data) {
              console.log(data);
            });

            docker.getContainer(dataContainer.term.id).inspect(function (err, data){
              console.log('inspect data here');
              console.log(data.NetworkSettings);
              console.log(data.NetworkSettings.Ports['8080/tcp']);;
              dataContainer.term.port = data.NetworkSettings.Ports['8080/tcp'][0].HostPort;
              dataContainer.save();
              res.json(dataContainer);
            });
          });
        });
      }
    }
  });
}

exports.stop = function (req, res) {
  var dataContainerID = req.param('id');

  Container.findOne({'cid': dataContainerID}, function (err, dataContainer) {
    if (err) { res.json({ error: err })};
    if (dataContainer) {
      if (dataContainer.term.status === 'stopped') {
        res.json({error: 'The terminal is not running'});
      } else {
        docker.getContainer(dataContainer.term.id).stop(function (err) {
          dataContainer.term.status = 'stopped';
          dataContainer.term.port = null;
          dataContainer.save(function (err, dataContainer) {
            res.json(dataContainer);
            docker.getContainer(dataContainer.term.id).remove(function (err, data) {
              console.log(data);
            });
          });
        });
      }
    }
  });
}