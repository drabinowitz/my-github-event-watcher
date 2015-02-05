var db = require('./config');
var Event = require('./event.model');

var Events = db.Collection.extend({
  model: Event
});

module.exports = Events;
