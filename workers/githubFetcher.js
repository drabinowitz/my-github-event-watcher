var CronJob = require('cron').CronJob;
var httpRequest = require('http-request');
var Event = require('../db/event.model');
var Events = require('../db/event.collection');
var Promise = require('bluebird');
Promise.promisifyAll(httpRequest);

var githubFetcherCronJob;

var generateRequest = function (pageNumber, eTag) {
  var request = {};
  pageNumber = pageNumber || 1;
  request.url = 'https://api.github.com/users/drabinowitz/events/public?page=' + pageNumber;
  //pass in etag so we can verify there is new data to request
  if (eTag) {
    request.headers = {'If-None-Match': eTag};
  }
  return request;
};

//submit our individual request here
var submitRequest = function(pageToRequest, pagedData) {
  return httpRequest.getAsync(generateRequest(pageToRequest, lastRequestETag))
  .then(function (results) {
    //if there is new data to request
    if (parseInt(results.code, 10) === 200) {
      //if this is the initial request and there is new data, then update ETag
      if (pageToRequest === 1) {
        lastRequestETag = results.headers.etag;
      }
      var data = JSON.parse(results.buffer.toString());
      var oldestId = parseInt(data[data.length - 1].id, 10);
      //if oldest id on page is younger than our last request id return false, otherwise grab all the ids younger than our last request id and return true
      if (!lastRequestId || oldestId > lastRequestId) {
        pagedData.push(data);
        return false;
      } else {
        var i = data.length - 1;
        while (i >= 0 && parseInt(data[i].id, 10) < lastRequestId) {
          i--;
        }
        if (i > 0) {
          pagedData.push(data.splice(0, i));
        }
        return true;
      }
    } else {
      return true;
    }
  });
};

//if we are not done requesting pages than keep requesting, otherwise store data
var recursivelyRequestPages = function (pageToRequest, pagedData) {
  submitRequest(pageToRequest, pagedData)
  .then(function (isFinishedQuerying) {
    //when we are done querying or we have requested all 10 pages
    if (isFinishedQuerying || pageToRequest === 10) {
      if (pagedData.length > 0) {
        lastRequestId = parseInt(pagedData[0][0].id, 10);
        var eventsToSave = [];
        //loop through pages of data starting at last page
        for (var i = pagedData.length - 1; i >= 0 ; i--) {
          var pageOfData = pagedData[i];
          //loop through data in page starting at last and going to first
          for (var j = pageOfData.length - 1; j >= 0; j--) {
            var eventData = pageOfData[j];
            eventsToSave.push({
              type: eventData.type,
              created_at: eventData.created_at,
              updated_at: eventData.created_at,
              github_id: eventData.id
            });
          }
        }
        new Events(eventsToSave).invoke('save');
      }
    } else {
      recursivelyRequestPages(pageToRequest + 1, pagedData);
    }
  });
};

var lastRequestId;
var lastRequestETag;

var startCronJob = function () {
  if (!githubFetcherCronJob) {
    new Event()
    .query('orderBy', 'github_id', 'desc')
    .query('limit', 1)
    .fetch()
    .then(function (event) {
      if (event) {
        lastRequestId = event.get('github_id');
      }
    })
    .then(function () {
      githubFetcherCronJob = new CronJob('00 * * * * *', function () {
        var pageToRequest = 1;
        var pagedData = [];
        recursivelyRequestPages(pageToRequest, pagedData);
      }, null, true, 'America/New_York');
    });
  }
};

module.exports = startCronJob;
