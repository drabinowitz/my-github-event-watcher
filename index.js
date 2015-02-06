var mysql = require('mysql');
var async = require('async');

var client = mysql.createConnection({
  host: process.env.RDS_HOSTNAME || '127.0.0.1',
  user: process.env.RDS_USERNAME || 'root',
  password: process.env.RDS_PASSWORD || '',
  port: process.env.RDS_PORT || ''
});
async.series([
  function connect(callback) {
    client.connect(callback);
  },
  function clear(callback) {
    client.query('DROP DATABASE IF EXISTS github_events', callback);
  },
  function create_db(callback) {
    client.query('CREATE DATABASE github_events', callback);
  },
  function () {
    var app = require('./main');
    var debug = require('debug')('testingEB:server');
    var http = require('http');

    var port = normalizePort(process.env.PORT || '8000');
    app.set('port', port);

    var server = http.createServer(app);

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    function normalizePort(val) {
      var port = parseInt(val, 10);

      if (isNaN(port)) {
        return val;
      }

      if (port >= 0) {
        return port;
      }

      return false;
    }

    function onError(error) {
      throw error;
    }

    function onListening() {
      var addr = server.address();
      var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
      debug('Listening on ' + bind);
    }
  }
]);
