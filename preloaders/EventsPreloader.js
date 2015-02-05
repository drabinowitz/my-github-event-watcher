var EventsStore = require('../public/javascripts/stores/EventsStore');
var EventsController = require('../controllers/EventsController');

module.exports = function () {
  return EventsController.getNewEvents().then(function (events) {
    EventsStore.preloadData(events.toJSON());
    return {
      key: 'events',
      data: JSON.stringify(events)
    };
  });
};
