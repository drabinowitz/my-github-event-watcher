var Event = require('../db/event.model');
var moment = require('moment');

module.exports.getNewEvents = function (timestamp) {
  timestamp = timestamp || moment().subtract(1, 'days').toISOString();
  return new Event()
    .query('where', 'updated_at', '>', timestamp)
    .fetchAll();
};
