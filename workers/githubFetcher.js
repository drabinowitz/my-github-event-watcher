var CronJob = require('cron').CronJob;
var httpRequest = require('http-request');
var Promise = require('bluebird');
Promise.promisifyAll(httpRequest);


var githubFetcherCronJob;

var startCronJob = function () {
  if (!githubFetcherCronJob) {
    console.log(httpRequest.getAsync);
    githubFetcherCronJob = new CronJob('00 * * * * *', function () {
      httpRequest.getAsync('https://api.github.com/users/drabinowitz/events/public')
        .then(function (results) {
          console.log(results.buffer.toString());
        });
    }, null, true, 'America/Philadelphia');
  }
};

module.exports = startCronJob;
