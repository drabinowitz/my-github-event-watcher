var db = require('./config');
var Event = require('./event.model');

var Events = new db.Collection();

Events.model = Event;

module.exports = Events;
