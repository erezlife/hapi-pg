var pg = require('pg.js');
var Hoek = require('hoek');

var defaults = {
    connectionString: undefined,
    attach: 'onPreHandler',
    detach: 'tail'
};

exports.register = function(server, options, next) {
  var config = Hoek.applyToDefaults(defaults, options);

  server.ext(config.attach, function(request, reply) {
    var connectionString = generateConnection(options.connectionString, request);

    // if a connection string is not resolved, we stop the process
    if(!connectionString) {
      return reply.continue();
    }

    pg.connect(connectionString, function(err, client, done) {
      if ( err ) throw err;

      request.postgres = {
        client: client,
        done: done
      }
      reply.continue();
    });

  });

  server.on(config.detach, function(request, err) {
    if ( request.postgres ) {
      request.postgres.done();
    }
  });

  next();
}

exports.register.attributes = {
  pkg: require('./package.json')
}

function generateConnection(connectionString, request) {
  if(typeof connectionString === 'function') {
    return connectionString(request);
  } else {
    return connectionString;
  }
}
