var express = require('express');
var EventsController = require('../controllers/EventsController');

module.exports = express.Router().get('/', function (req, res) {
  var timestamp;
  if (req.query && req.query.newestEventTimestamp) {
    timestamp = req.query.newestEventTimestamp;
  }
  EventsController.getNewEvents(timestamp).then(function (collection) {
    res.json(collection);
  });
});
