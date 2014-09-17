'use strict';

var github = require('octonode');

exports.update = function (req, res) {

  var repo = req.param('id');
  var file = req.body.file || '';
  var content = req.body.content;
  var commit = req.body.commit;

  var client = github.client(req.user.token);
  var uri = '/repos/' + req.user.username + '/' + repo + '/contents/' + file;

  var ghRepo = client.repo(req.user.username + '/' + repo);

  ghRepo.contents(file, function (err, file) {
    if (file.type === 'file') {
      var buff = new Buffer(content);
      ghRepo.updateContents(file.path, commit, content, file.sha, function (err, data) {
        res.json(data);
      });
    };
  });

  // client.get(uri, {}, function (err, status, body, headers) {
  //   if (body.type === 'file') {
  //     var buff = new Buffer(req.body.content);
  //     ghrepo.updateContents('lib/index.js', 'commit message', 'content', 'put-sha-here', callback); 
  //   }

  //   res.json(body);
  // });

  // var buff = new Buffer('JavaScript');
  // var s = b.toString('base64');

  // var  path = '',
  //   message = '',
  //   content = '',
  //       sha = '',
  //    branch = 'master';
}

// exports.read = function (req, res) {
//   var repo = req.param('id');
//   var pathOrFile = req.param('file') || '';
//   var client = github.client(req.user.token);
//   var uri = '/repos/' + req.user.username + '/' + repo + '/contents/' + pathOrFile;

//   client.get(uri, {}, function (err, status, body, headers) {
//     // res.json(body);
//     if (body.type === 'file') {
//       var buff = new Buffer(body.content, 'base64');
//       body.content  = buff.toString();
//     }

//     res.json(body);
//   });
// }


