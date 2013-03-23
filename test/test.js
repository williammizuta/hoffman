var assert = require('chai').assert
  , fs = require('fs')

var options = {
  "settings" : {
    "views" : __dirname + '/templates',
    "view cache" : false
  },
  "planet" : "world"
};

var hoffman = require('../index.js');
var render = hoffman.__express();
var templates = __dirname + '/templates';
var data = {"planet" : "world"};



describe('Dust object', function(){
  it('should be available', function(){
    assert.typeOf(hoffman.dust, 'object', 'hoffman.dust is an object');
  })
});

describe('Dust templates', function(){
  it('should be parsed into output', function(done){
    render(templates + '/hello.dust', options, function(err, output){
      assert.equal( "hello world", output);
      done();
    })
  })
  it('should dynamically include partials', function(done){
    render(templates + '/main.dust', options, function(err, output){
      assert.equal( "hello world", output);
      done();
    })
  })
});

describe('Dust cache', function(){
  it('should not store rendered templates when disabled', function(done){
    render(templates + '/hello.dust', options, function(err, output){
      render(templates + '/main.dust', options, function(err, output){
        assert.typeOf(hoffman.dust.cache.hello, 'undefined', 'dust.cache.hello is undefined');
        done();
      })
    })
  })

  it('should store rendered templates when enabled', function(done){
    options.settings["view cache"] = true;
    render(templates + '/hello.dust', options, function(err, output){
      render(templates + '/main.dust', options, function(err, output){
        assert.typeOf(hoffman.dust.cache.hello, 'function', 'dust.cache.hello is a function');
        done();
      })
    })
  })
  it('should be primable with all templates in the view dir', function(done){
    hoffman.prime(options.settings.views);
    assert.lengthOf(Object.keys(hoffman.dust.cache), 3, 'dust.cache contains 3 functions');
    done();
  })
});

describe('Dust streaming', function(){
  it('should be supported', function(done){
    var output = '';
    var req = { "app" : options };
    hoffman.stream(req, {}, function(err, req, res){
      res.stream('hello', options, function(stream){
        stream.on('data', function(chunk) {
          output = output + chunk;
        })
        .on('end', function(err) {
          assert.equal( "hello world", output);
          done();
        })
        .on('error', function(err) {
          console.warn(err);
          assert.typeOf(err, 'undefined', "forced fail on streaming error");
          done();
        });
      });
    });
  })
});



