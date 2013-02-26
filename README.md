# dustjs view engine for express

```
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'dust');
app.engine('dust', require('hoffman').__express(app.settings.views));
```

![dustin](https://raw.github.com/wiki/diffsky/hoffman/hoffman.jpg)
