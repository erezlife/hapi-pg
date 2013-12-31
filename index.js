var pg = require('pg.js')

exports.register = function(plugin, options, next) {

  plugin.ext('onRequest', function(request, extNext) {
    var connectionString = getConnectionString(options.connectionString)

    pg.connect(connectionString, function(err, client, done) {
      request.postgres = {
        client: client,
        done: done
      }
      extNext()
    })
    
  })

  plugin.events.on('tail', function(request, err) {
    request.postgres.done()
  })

  next()
}

function generateConnection(connectionString, request) {
  if(typeof connectionString === 'function') {
    return connectionString(request)
  } else {
    return connectionString
  }
}
