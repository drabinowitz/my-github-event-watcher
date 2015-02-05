var test = require('./workers/githubFetcher');
console.log(test);
var http = require('http');
console.log('here');
var server = http.createServer(function(){});
test();
server.listen(8080,'127.0.0.1');
