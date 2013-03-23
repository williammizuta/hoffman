# Hoffman [![](https://travis-ci.org/diffsky/hoffman.png)](https://travis-ci.org/diffsky/hoffman)

A [dust.js](https://github.com/linkedin/dustjs) view engine for [express](https://github.com/visionmedia/express).


```
var hoffman = require('hoffman');

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'dust');
app.engine('dust', hoffman.__express());

// works with caching
app.set('view cache', true);

// optionally load all templates into dust cache on server start
hoffman.prime(app.settings.views);
```

![dustin](https://raw.github.com/wiki/diffsky/hoffman/hoffman.jpg)