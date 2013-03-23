# Hoffman [![](https://travis-ci.org/diffsky/hoffman.png)](https://travis-ci.org/diffsky/hoffman)

A [dust.js](https://github.com/linkedin/dustjs) view engine for [express](https://github.com/visionmedia/express).

### Usage

```
var hoffman = require('hoffman');

app.set('views', path.join(__dirname, 'templates')); // path to your templates
app.set('view engine', 'dust');
app.engine('dust', hoffman.__express());

// works with caching
app.set('view cache', true);

// optionally load all templates into dust cache on server start
hoffman.prime(app.settings.views);
```

### Cache Priming

With `view cache` set to `true`, templates will be cached in memory the first time they are read off disk.

With `hoffman.prime(app.settings.views)` all templates inside of the view directory
will be read into memeory on server start, meaning no first disk access after the server has started.

![dustin](https://raw.github.com/wiki/diffsky/hoffman/hoffman.jpg)
