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
    request.reqBody = new Buffer(JSON.stringify({'If-None-Match': eTag}));
  }
  return request;
};

//submit our individual request here
var submitRequest = function(pageToRequest, pagedData) {
  return httpRequest.getAsync(generateRequest(page, lastRequestETag))
  .then(function (results) {
    //if there is new data to request
    if (parseInt(results.code, 10) === 200) {
      //if this is the initial request and there is new data, then update ETag
      if (pageToRequest === 1) {
        lastRequestETag = pageToRequest.headers.ETag;
      }
      var data = results.buffer.toString();
      var oldestId = parseInt(data[data.length - 1].id, 10);
      //if oldest id on page is younger than our last request id return false, otherwise grab all the ids younger than our last request id and return true
      if (!lastRequestId || oldestId > lastRequestId) {
        pagedData.push(data);
        return false;
      } else {
        var i = data.length - 1;
        while (parseInt(data[i].id < lastRequestId)) {
          i++;
        }
        pagedData.push(data.splice(0, i));
        return true;
      }
    }
  });
};

//if we are not done requesting pages than keep requesting, otherwise store data
var recursivelyRequestPages = function (pageToRequest, pagedData) {
  submitRequest(pageToRequest, pagedData)
  .then(function (isFinishedQuerying) {
    //when we are done querying or we have requested all 10 pages
    if (isFinishedQuerying || pageToRequest === 10) {
      lastRequestId = parseInt(pagedData[0][0].id, 10);
      var eventsToSave = [];
      //loop through pages of data
      for (var i = 0; i < pagedData.length; i++) {
        var pageOfData = pagedData[i];
        //loop through data in page
        for (var j = 0; j < pageOfData; j++) {
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
    } else {
      recursivelyRequestPages(pageToRequest + 1, pagedData);
    }
  });
};

var lastRequestId;
var lastRequestETag;

var startCronJob = function () {
  if (!githubFetcherCronJob) {
    new Event().fetch().then(function (event) {
      if (event) {
        return event.get('github_id').then(function (id) {
          lastRequestId = id;
        });
      }
    })
    .then(function () {
      githubFetcherCronJob = new CronJob('00 * * * * *', function () {
        var pageToRequest = 1;
        var pagedData = [];
        recursivelyRequestPages(pageToRequest, pagedData);
      }, null, true, 'America/Philadelphia');
    });
  }
};

module.exports = startCronJob;
