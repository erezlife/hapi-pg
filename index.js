var pg = require('pg.js');

exports.register = function(plugin, options, next) {

  plugin.ext('onRequest', function(request, extNext) {
    var connectionString = generateConnection(options.connectionString, request);

    // if a connection string is not resolved, we stop the process
    if(!connectionString) {
      return extNext();
    }

    pg.connect(connectionString, function(err, client, done) {
      if ( err ) throw err;

      request.postgres = {
        client: client,
        done: done
      }
      extNext();
    });

  });

  plugin.events.on('tail', function(request, err) {
    if ( request.postgres ) {
      request.postgres.done();
    }
  });

  next();
}

function generateConnection(connectionString, request) {
  if(typeof connectionString === 'function') {
    return connectionString(request);
  } else {
    return connectionString;
  }
}
