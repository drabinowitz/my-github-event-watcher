var express = require('express');
var EventsController = require('../controllers/EventsController');

module.exports = express.Router().get('/', function (req, res) {
  var timestamp;
  console.log(req.url);
  if (req.body && req.body.newestEventTimestamp) {
    timestamp = req.body.newestEventTimestamp;
  }
  EventsController.getNewEvents(timestamp).then(function (collection) {
    res.json(collection);
  });
});
