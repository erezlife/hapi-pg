hapi-pg
=======
Wrap Hapi requests with access to a Postgres connection.

It gives you access to `request.postgres.client` within your handlers which you can then use to make Postgres requests. It also takes care of cleaning up the connection after the request.

Usage
-----
```js
var hapiPgOpts = {
  connectionString: 'tcp://postgres@localhost:5432/postgres'
};

server.register({
  register: require('hapi-pg'),
  options: hapiPgOpts
}, function (err) {
  if (err) {
    console.error(err);
    throw err;
  }
});
```

It can also take a function to dynamically resolve connection name based on the incoming request.
```js
var hapiPgOpts = {
  connectionString: function(request) {
    return 'tcp://postgres@localhost:5432/' + request.query.database;
  }
};

server.register({
  register: require('hapi-pg'),
  options: hapiPgOpts
}, function (err) {
  if (err) {
    console.error(err);
    throw err;
  }
});
```

The plugin accepts an options object with the following properties:

- `connectionString` database connection string or function that returns the connection string and accepts the incoming request as an argument.
- `attach` - a string representing the extension point event that attaches the pg connection to the request. Default is `onPreHandler`.
- `detach` - a string representing the extension point event where connection cleanup is performed. Default is `tail`.

License
-------
MIT
