var path = require('path')
  , duster = require('duster')
  , dust = duster.dust;

module.exports = {
  __express: function(views) {
    duster.prime(views);
    return function(file, options, cb){
      if (!options.cache) duster.prime(options.settings.views);
      var template = path.relative(options.settings.views, file).slice(0, -5);
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
  dust: duster.dust
};