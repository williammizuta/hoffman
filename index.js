var fs = require('fs')
  , path = require('path')
  , duster = require('duster')
  , dust = duster.dust;

var appOptions;

dust.onLoad = function (template, cb) {
  // nuke the dust cache if app is set to not use caching
  if (!appOptions.cache) dust.cache = {};

  // if no extname then handling a partial, figure out the full path
  if (path.extname(template) == '') {
    template = path.join(appOptions.settings.views, template) + '.dust';
  }

  // read the template off disk
  fs.readFile(template, 'utf8', function(err, data){
    if (err) return cb(err);
    cb(err, data);
  })
}

module.exports = {
  __express: function() {
    return function(template, options, cb){
      appOptions = options;
      var template = path.relative(options.settings.views, template).slice(0, -5);
      dust.render(template, options, function(err, output){
        cb(err, output);
      });
    }
  },
  stream: function(req, res, next) {
    res.stream = function(template, data, cb){
      var stream = dust.stream(template, data);
      if (cb) {
        cb(stream);
      } else {
        stream.on('data', function(chunk) {
          if (chunk) {
            res.write(chunk);
          }
        })
        .on('end', function(err) {
          res.end();
        })
        .on('error', function(err) {
          next(err);
        });
      }
    };
    next(null, req, res);
  },
  prime: function(views) {
    duster.prime(views);
  },
  dust: duster.dust
};
