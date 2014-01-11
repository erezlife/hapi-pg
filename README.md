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

server.pack.require('hapi-pg', hapiPgOpts, function(err) {
  if(err) {
    console.error(err);
    throw err;
  }
});
```

It can also take a function to dynamically resolve connection name based on the incoming request.
```js
var hapiPgOpts = {
  connectionString: function(request) {
    return config.pgConnection(request.query.database)
  }
};
server.pack.require('hapi-pg', hapiPgOpts, function(err) {});
```

License
-------
MIT
