var Event = require('../db/event.model');
var moment = require('moment');

module.exports.getNewEvents = function (timestamp) {
  if (timestamp) {
    console.log('preiso', timestamp);
    timestamp = moment(timestamp).subtract(5, 'hours').toISOString();
    console.log('postiso', timestamp);
  } else {
    timestamp = moment().subtract(1, 'days').toISOString();
  }
  return new Event()
    .query('where', 'updated_at', '>', timestamp)
    .fetchAll();
};
